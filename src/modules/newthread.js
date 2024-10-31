const utils = require("../utils");
const threads = require("../data/threads");
const {getOrFetchChannel} = require("../utils");

module.exports = ({ bot, knex, config, commands }) => {
  commands.addInboxServerCommand("newthread", "<userId:userId>", async (msg, args, thread) => {
    const user = bot.users.get(args.userId) || await bot.getRESTUser(args.userId).catch(() => null);
    if (! user) {
      utils.postSystemMessageWithFallback(msg.channel, thread, "L'utilisateur n'a pas été trouver!");
      return;
    }

    if (user.bot) {
      utils.postSystemMessageWithFallback(msg.channel, thread, "On ne peut créer de ticket avec un bot");
      return;
    }

    const existingThread = await threads.findOpenThreadByUserId(user.id);
    if (existingThread) {
      utils.postSystemMessageWithFallback(msg.channel, thread, `Je ne peux pas créer de nouveaux tickets, il ya déja un ticket ouvert avec le membre: <#${existingThread.channel_id}>`);
      return;
    }

    const createdThread = await threads.createNewThreadForUser(user, {
      quiet: true,
      ignoreRequirements: true,
      ignoreHooks: true,
      source: "command",
    });

    createdThread.postSystemMessage(`Le ticket a été ouvert par ${msg.author.nick || config.useDisplaynames ? msg.author.globalName || msg.author.username : msg.author.username}`);

    const channel = await getOrFetchChannel(bot, msg.channel.id);
    channel.createMessage(`Ticket ouvert: <#${createdThread.channel_id}>`);
  });
};
