const { Command } = require("sheweny");

class ideecommands extends Command {
  constructor(client) {
    super(client, {
      name: "idee",
      description: "Envoie une idée à l'équipe",
      aliases: ["idee", "idée"],
      cooldown: 3600000,
      split: "sticky",
      args: [
        {
          id: "messagecontent",
          match: "content",
        },
      ],
      userPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    });
  }

  exec(message, args) {
    if (message.channel.type === "dm")
      return message.reply(
        "Commande bloqué en mp désolé, toute mes commandes le sont en mp !"
      );
    const msgcontent = args.messagecontent;
    if (!msgcontent)
      return message.channel.send(
        "Tu essaye d'envoyer une idée vide mais pourquoi :thinking: ?"
      );
    if (message.attachments.size === 0) {
      message.client.channels
        .fetch("669192672132595716")
        .then((salondm) =>
          salondm.send(
            `${msgcontent} \n\n c'est \`${message.author.tag}\` qui a écrit cette idée !`
          )
        )
        .then(message.channel.send("Votre idée a bien été reçu !"));
    } else {
      message.client.channels
        .fetch("669192672132595716")
        .then((salondm) =>
          salondm.send(
            `${msgcontent} \n\n c'est \`${
              message.author.tag
            }\` qui a écrit cette idée ! ${message.attachments.first().url}`
          )
        );
    }
  }
}
module.exports = ideecommands;
