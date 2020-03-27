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
    message.channel.send(`${msgcontent}`, { tts: true });
  }
}
module.exports = ttscommands;
