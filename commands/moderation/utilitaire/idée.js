const { Command } = require("discord-akairo");
class ideecommands extends Command {
  constructor() {
    super("idee", {
      aliases: ["idee"],
      cooldown: 10000,
      ratelimit: 2,
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
    const msgcontent = args.messagecontent;
    if (!msgcontent)
      return message.channel.send(
        "Tu essaye d'évaluer du vide mais pourquoi :thinking: ?"
      );

    message.guild.members.fetch("268432158262165504").then(membres => {
      membres.send(`${msgcontent} c'est ${message.author.tag} qui a écrit cette idée !`);
    });
  }
}
module.exports = ideecommands;
