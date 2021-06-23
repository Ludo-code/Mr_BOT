const { Command } = require("discord-akairo");

class votecommands extends Command {
  constructor() {
    super("vote", {
      aliases: ["vote"],
      split: "sticky",
      clientPermissions: ["SEND_MESSAGES"]
    });
  }

  async exec(message) {
  if (message.channel.type === "dm") return message.reply("Oui je bloque les informations du bot en MP et alors c'est pas de ma faute c'est mon maitre ! :joy:");
  message.channel.send("Pour votez pour le bot fonce sur ce lien : <https://bladebotlist.xyz/bot/636098912859717634> \n \n cela me permet de lui faire gagnez en visibiliter et par conséquent l'améliorer :wink:");
  }
}
module.exports = votecommands;
