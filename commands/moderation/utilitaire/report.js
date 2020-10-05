const { Command } = require("discord-akairo");

class reportcommands extends Command {
  constructor() {
    super("report", {
      aliases: ["report"],
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
    if (message.channel.type === "dm") return message.reply("Tu ne peux pas faire de report en mp même si ça aurait été bien !");
    const msgcontent = args.messagecontent;
    if (message.attachments.size === 0) {
      message.client.channels.fetch("669192672132595716").then(salondm => salondm.send(`${msgcontent} \n\n c'est \`${message.author.tag}\` qui a écrit ce rapport de bug !`)).then(message.channel.send("Votre report de bug a bien été reçu !"));
    } else {
      message.client.channels.fetch("669192672132595716").then(salondm => salondm.send(`${msgcontent} \n\n c'est ${message.author.tag} qui a écrit ce rapport de bug ! ${message.attachments.first().url}`)).then(message.channel.send("Votre report de bug a bien été reçu !"));
    }
  }
}
module.exports = reportcommands;
