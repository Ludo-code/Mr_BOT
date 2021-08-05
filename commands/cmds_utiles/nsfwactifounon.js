const { Command } = require("discord-akairo");

class nsfwcommands extends Command {
  constructor() {
    super("nsfw", {
      aliases: ["nsfw"],
      split: "sticky",
      args: [
        {
          id: "contenutxt",
          match: "content",
        },
      ],
      clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    });
  }
  exec(message, args) {
    const member = message.member;
    if (message.channel.type === "dm")
      return message.reply("Les mps ne sont pas un serveurs désolé.");
    if (!member.hasPermission("ADMINISTRATOR")) {
      message.channel.send(
        `${message.author}, désolé mais seul un administrateur à l'authorisation d'activé ou de désactivé les commandes nsfw`
      );
      return;
    }
    const msgcontent = args.contenutxt;
    if (!msgcontent) {
      message.channel.send(
        "La syntaxe est `m*nsfw actif` **ou** `m*nsfw inactif`"
      );
      return;
    }

    if (msgcontent === "actif") {
      message.channel.send("Les paramètres du serveur on été mis sur actif.");
      return;
    } else if (msgcontent === "inactif") {
      message.channel.send(
        "Les paramètres du serveurs on été mis sur inactif."
      );
      return;
    }
  }
}
module.exports = nsfwcommands;
