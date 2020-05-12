const { Command } = require("discord-akairo");

class ideecommands extends Command {
  constructor() {
    super("idee", {
      aliases: ["idee"],
      cooldown: 3600000,
      split: "sticky",
      args: [
        {
          id: "messagecontent",
          match: "content"
        }
      ]
    });
  }

  exec(message, args) {
    if (message.channel.type === "dm") return message.reply("Commande bloqué en mp désolé, toute mes commandes le sont en mp !");
    const msgcontent = args.messagecontent;
    if (message.attachments.size === 0) {
      message.client.channels.fetch("669192672132595716").then(salondm => salondm.send(`${msgcontent} \n\n c'est ${message.author.tag} qui a écrit cette idée !`)).then(message.channel.send("Votre idée a bien été reçu !"));
    } else {
      message.client.channels.fetch("669192672132595716").then(salondm => salondm.send(`${msgcontent} \n\n c'est ${message.author.tag} qui a écrit cette idée ! ${message.attachments.first().url}`)).then(message.channel.send("Votre idée a bien été reçu !"));
    }
  }
}
module.exports = ideecommands;
