const { Command } = require("discord-akairo");
class direcommands extends Command {
  constructor() {
    super("dire", {
      aliases: ["dire", "dis"],
      split: "sticky",
      args: [
        {
          id: "contenutxt",
          match: "content"
        }
      ]
    });
  }

  exec(message, args) {
    if (message.channel.type === "dm") return message.reply("Interdit de répéter les message en mp ! :joy:");
    message.delete({});
    const msgcontent = args.contenutxt;
    if (!msgcontent) 
      return message.channel.send(
        "Tu essaye d'évaluer du vide mais pourquoi :thinking: ?"
      ).then(message.delete(5000))
    
    message.channel.send(msgcontent);
  }
}
module.exports = direcommands;
