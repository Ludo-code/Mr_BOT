const { Command } = require("discord-akairo");

class infobotcommands extends Command {
  constructor() {
    super("info-bot", {
      aliases: ["info-bot"],
      split: "sticky"
    });
  }

  async exec(message) {
  if (message.channel.type === "dm") return message.reply("Oui je bloque les informations du bot en MP et alors c'est pas de ma faute c'est mon maitre ! :joy:");
  message.channel.send("Retrouve le bot sur **INTERNET** (https://ludo-code.github.io/mr-bot/) \n ou retrouve le sur **GITHUB** (https://github.com/Ludo-code/Mr_BOT/) \n\n Le bot a été crée par Ludovic 17 ans.").then(console.log(`La commande info-bot a été exécuté par ${message.author.tag} de l'id : ${message.author}`)); 
  }
}
module.exports = infobotcommands;
