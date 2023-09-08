const { Command } = require("sheweny");

class bugcommands extends Command {
  constructor(client) {
    super(client, {
      name: "bug",
      split: "sticky",
      aliases: ["bug"],
      description: "Permet de signaler un bug",
      cooldown: 3600000,
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
        "Tu ne peux pas faire de rapport de bug en mp même si ça aurait été bien !"
      );
    const msgcontent = args.messagecontent;
    if (!msgcontent)
      return message.channel.send(
        "Tu essaye d'envoyer un rapport vide mais pourquoi :thinking: ?"
      );
    if (message.attachments.size === 0) {
      message.client.channels
        .fetch("669192672132595716")
        .then((salondm) =>
          salondm.send(
            `${msgcontent} \n\n c'est \`${message.author.tag}\` qui a écrit ce rapport de bug !`
          )
        )
        .then(message.channel.send("Votre rapport de bug a bien été reçu !"));
    } else {
      message.client.channels
        .fetch("669192672132595716")
        .then((salondm) =>
          salondm.send(
            `${msgcontent} \n\n c'est \`${
              message.author.tag
            }\` qui a écrit ce rapport de bug ! ${
              message.attachments.first().url
            }`
          )
        );
    }
  }
}
module.exports = bugcommands;
