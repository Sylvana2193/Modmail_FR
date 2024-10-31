module.exports = ({ bot, knex, config, commands }) => {
  commands.addInboxThreadCommand("alert", "[opt:string]", async (msg, args, thread) => {
    if (args.opt && args.opt.startsWith("c")) {
      await thread.removeAlert(msg.author.id)
      await thread.postSystemMessage("Vous ne receverez plus d'alert");
    } else {
      await thread.addAlert(msg.author.id);
      await thread.postSystemMessage(`**${msg.author.nick || config.useDisplaynames ? msg.author.globalName || msg.author.username : msg.author.username}** vous recevrez une notification quand ce ticket recevra de nouveaux messages`);
    }
  }, { allowSuspended: true });
};
