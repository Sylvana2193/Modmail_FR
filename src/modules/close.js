const moment = require("moment");
const Eris = require("eris");
const utils = require("../utils");
const threads = require("../data/threads");
const blocked = require("../data/blocked");
const { messageQueue } = require("../queue");
const { getLogUrl, getLogFile, getLogCustomResponse } = require("../data/logs");
const {THREAD_MESSAGE_TYPE} = require("../data/constants");

module.exports = ({ bot, knex, config, commands }) => {
  async function getMessagesAmounts(thread) {
    const messages = await thread.getThreadMessages();
    const chatMessages = [];
    const toUserMessages = [];
    const fromUserMessages = [];

    messages.forEach(message => {
      switch (message.message_type) {
        case THREAD_MESSAGE_TYPE.CHAT:
          chatMessages.push(message);
          break;

        case THREAD_MESSAGE_TYPE.TO_USER:
          toUserMessages.push(message);
          break;

        case THREAD_MESSAGE_TYPE.FROM_USER:
          fromUserMessages.push(message);
          break;
      }
    });

    return [
      `**${fromUserMessages.length}** message${fromUserMessages.length !== 1 ? "s" : ""} du membre`,
      `, **${toUserMessages.length}** message${toUserMessages.length !== 1 ? "s" : ""} envoyé`,
      ` et **${chatMessages.length}** message interne${chatMessages.length !== 1 ? "s" : ""}.`,
    ].join("");
  }

  async function sendCloseNotification(thread, body) {
    const logCustomResponse = await getLogCustomResponse(thread);
    if (logCustomResponse) {
      await utils.postLog(body);
      await utils.postLog(logCustomResponse.content, logCustomResponse.file);
      return;
    }

    body = `${body}\n${await getMessagesAmounts(thread)}`;

    const logUrl = await getLogUrl(thread);
    if (logUrl) {
      utils.postLog(utils.trimAll(`
          ${body}
          Logs: ${logUrl}
        `));
      return;
    }

    const logFile = await getLogFile(thread);
    if (logFile) {
      utils.postLog(body, logFile);
      return;
    }

    utils.postLog(body);
  }

  // Check for threads that are scheduled to be closed and close them
  async function applyScheduledCloses() {
    const threadsToBeClosed = await threads.getThreadsThatShouldBeClosed();
    for (const thread of threadsToBeClosed) {
      if (config.closeMessage && ! thread.scheduled_close_silent) {
        const closeMessage = utils.readMultilineConfigValue(config.closeMessage);
        await thread.sendSystemMessageToUser(closeMessage).catch(() => {});
      }

      await thread.close(false, thread.scheduled_close_silent);

      await sendCloseNotification(thread, `Le ticket #${thread.thread_number} avec ${thread.user_name} (${thread.user_id}) a été cloturé par ${thread.scheduled_close_name}`);
    }
  }

  async function scheduledCloseLoop() {
    try {
      await applyScheduledCloses();
    } catch (e) {
      console.error(e);
    }

    setTimeout(scheduledCloseLoop, 2000);
  }

  scheduledCloseLoop();

  // Close a thread. Closing a thread saves a log of the channel's contents and then deletes the channel.
  commands.addGlobalCommand("close", "[opts...]", async (msg, args) => {
    let thread, closedBy;

    let hasCloseMessage = !! config.closeMessage;
    let silentClose = false;
    let suppressSystemMessages = false;

    if (msg.channel instanceof Eris.PrivateChannel) {
      // User is closing the thread by themselves (if enabled)
      if (! config.allowUserClose) return;
      if (await blocked.isBlocked(msg.author.id)) return;

      thread = await threads.findOpenThreadByUserId(msg.author.id);
      if (! thread) return;

      // We need to add this operation to the message queue so we don't get a race condition
      // between showing the close command in the thread and closing the thread
      await messageQueue.add(async () => {
        thread.postSystemMessage("Le ticket a été fermé, fermeture...");
        suppressSystemMessages = true;
      });

      closedBy = "the user";
    } else {
      // A staff member is closing the thread
      if (! await utils.messageIsOnInboxServer(bot, msg)) return;
      if (! utils.isStaff(msg.member)) return;

      thread = await threads.findOpenThreadByChannelId(msg.channel.id);
      if (! thread) return;

      const opts = args.opts || [];

      if (args.cancel || opts.includes("cancel") || opts.includes("c")) {
        // Cancel timed close
        if (thread.scheduled_close_at) {
          await thread.cancelScheduledClose();
          thread.postSystemMessage("interruption de la fermeture programmé");
        }

        return;
      }

      // Silent close (= no close message)
      if (args.silent || opts.includes("silent") || opts.includes("s")) {
        silentClose = true;
      }

      // Timed close
      const delayStringArg = opts.find(arg => utils.delayStringRegex.test(arg));
      if (delayStringArg) {
        const delay = utils.convertDelayStringToMS(delayStringArg);
        if (delay === 0 || delay === null) {
          thread.postSystemMessage("Durée spécifiée invalid. Format: \"1h30m\"");
          return;
        }

        const closeAt = moment.utc().add(delay, "ms");
        await thread.scheduleClose(closeAt.format("YYYY-MM-DD HH:mm:ss"), msg.author, silentClose ? 1 : 0);

        let response;
        if (silentClose) {
          response = `Le ticket va etre cloturé silencieusement dans ${utils.humanizeDelay(delay)}. Utilisez \`${config.prefix}close cancel\` pour stopper la fermeture.`;
        } else {
          response = `Le ticket va etre cloturé dans ${utils.humanizeDelay(delay)}. Utilisez \`${config.prefix}close cancel\` pour stopper la fermeture.`;
        }

        thread.postSystemMessage(response);

        return;
      }

      // Regular close
      closedBy = config.useDisplaynames ? msg.author.globalName || msg.author.username : msg.author.username;
    }

    // Send close message (unless suppressed with a silent close)
    if (hasCloseMessage && ! silentClose) {
      const closeMessage = utils.readMultilineConfigValue(config.closeMessage);
      await thread.sendSystemMessageToUser(closeMessage).catch(() => {});
    }

    await thread.close(suppressSystemMessages, silentClose);

    await sendCloseNotification(thread, `Le ticket #${thread.thread_number} avec ${thread.user_name} (${thread.user_id}) a été fermé par ${closedBy}`);
  }, {
    options: [
      { name: "silent", shortcut: "s", isSwitch: true },
      { name: "cancel", shortcut: "c", isSwitch: true },
    ],
  });

  // Auto-close threads if their channel is deleted
  bot.on("channelDelete", async (channel) => {
    if (! (channel instanceof Eris.TextChannel)) return;
    if (channel.guild.id !== utils.getInboxGuild().id) return;

    const thread = await threads.findOpenThreadByChannelId(channel.id);
    if (! thread) return;

    console.log(`[INFO] La fermeture automatique avec ${thread.user_name} car le channel a été supprimé`);
    if (config.closeMessage) {
      const closeMessage = utils.readMultilineConfigValue(config.closeMessage);
      await thread.sendSystemMessageToUser(closeMessage).catch(() => {});
    }

    await thread.close(true);

    await sendCloseNotification(thread, `Le ticket #${thread.thread_number} avec ${thread.user_name} (${thread.user_id}) a été automatiquement cloturé car le channel a été supprimé`);
  });
};