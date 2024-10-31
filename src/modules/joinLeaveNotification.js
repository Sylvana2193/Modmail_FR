const config = require("../cfg");
const threads = require("../data/threads");
const utils = require("../utils");

module.exports = ({ bot }) => {
  const leaveIgnoreIDs = [];

  // Join Notification: Post a message in the thread if the user joins a main server
  if (config.notifyOnMainServerJoin) {
    bot.on("guildMemberAdd", async (guild, member) => {
      const mainGuilds = utils.getMainGuilds();
      if (! mainGuilds.find((gld) => gld.id === guild.id)) return;

      const thread = await threads.findOpenThreadByUserId(member.id);
      if (thread != null) {
        await thread.postSystemMessage(
          `***Le membre a rejoin le serveur ${guild.name} .***`
        );
      }
    });
  }

  // Leave Notification: Post a message in the thread if the user leaves a main server
  if (config.notifyOnMainServerLeave) {
    bot.on("guildMemberRemove", async (guild, member) => {
      const mainGuilds = utils.getMainGuilds();
      if (! mainGuilds.find((gld) => gld.id === guild.id)) return;

      // Ensure that possible ban events are caught before sending message (race condition)
      setTimeout(async () => {
        const thread = await threads.findOpenThreadByUserId(member.id);
        if (thread != null) {
          if (leaveIgnoreIDs.includes(member.id)) {
            leaveIgnoreIDs.splice(leaveIgnoreIDs.indexOf(member.id), 1);
          } else {
            await thread.postSystemMessage(
              `***Le membre vient de quitter le serveur ${guild.name} .***`
            );
          }
        }
      }, 2 * 1000);
    });
  }

  // Leave Notification: Post a message in the thread if the user is banned from a main server
  if (config.notifyOnMainServerLeave) {
    bot.on("guildBanAdd", async (guild, user) => {
      const mainGuilds = utils.getMainGuilds();
      if (! mainGuilds.find((gld) => gld.id === guild.id)) return;

      const thread = await threads.findOpenThreadByUserId(user.id);
      if (thread != null) {
        await thread.postSystemMessage(
          `***Le membre a été banni du serveur ${guild.name} .***`
        );
        leaveIgnoreIDs.push(user.id);
      }
    });
  }

  // "Join" Notification: Post a message in the thread if the user is unbanned from a main server
  if (config.notifyOnMainServerJoin) {
    bot.on("guildBanRemove", async (guild, user) => {
      const mainGuilds = utils.getMainGuilds();
      if (! mainGuilds.find((gld) => gld.id === guild.id)) return;

      const thread = await threads.findOpenThreadByUserId(user.id);
      if (thread != null) {
        await thread.postSystemMessage(
          `***Le membre a été déban du serveur ${guild.name} .***`
        );
      }
    });
  }
};
