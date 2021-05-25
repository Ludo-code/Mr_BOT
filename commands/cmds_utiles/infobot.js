const { Command } = require("discord-akairo");

class infobotcommands extends Command {
  constructor() {
    super("info-bot", {
      aliases: ["info-bot"],
      split: "sticky"
    });
  }

  async exec(message) {
  const client = this.client;
  if (message.channel.type === "dm") return message.reply("Oui je bloque les informations du bot en MP et alors c'est pas de ma faute c'est mon maitre ! :joy:");
  message.channel.send("Retrouve le bot sur **INTERNET** (<https://ludo-code.github.io/mr-bot/>) \n ou retrouve le sur **GITHUB** (<https://github.com/Ludo-code/Mr_BOT/>) \n ou rejoint notre **SERVEUR DISCORD** pour de l'aide ou autres (<https://discord.gg/4z5zvdae7r>) \n\n Le bot est actuellement sur **" + `${client.guilds.cache.size} ` + "serveurs**. \n\n Le bot a été crée par Ludovic 18 ans."); 
  }
}
module.exports = infobotcommands;
