const { Command } = require("discord-akairo");
class ttscommands extends Command {
  constructor() {
    super("tts", {
      aliases: ["tts"],
      split: "sticky",
      args: [
        {
          id: "une_banane",
          match: "content"
        }
      ]
    });
  }

  exec(message, args) {
    if (message.channel.type === "dm") return message.reply("Pas de tts en MP merci ! :joy:");
    message.delete({});
    const msgcontent = args.une_banane;
    if (!msgcontent) 
      return message.channel.send(
        "Tu essaye d'évaluer du vide mais pourquoi :thinking: ?"
      );
    
    message.channel.send(`${msgcontent}`, { tts: true }).then(console.log(`La commande tts a été exécuté par ${message.author.tag} de l'id : ${message.author}`));
  }
}
module.exports = ttscommands;
