const { Command } = require("sheweny");

class infobotcommands extends Command {
  constructor(client) {
    super(client, {
      name: "info-bot",
      description: "Affiche des informations sur le bot",
      aliases: ["info-bot"],
      split: "sticky",
      userPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    });
  }

  async exec(message) {
    const client = this.client;
    if (message.channel.type === "dm")
      return message.reply(
        "Oui je bloque les informations du bot en MP et alors c'est pas de ma faute c'est mon maitre ! :joy:"
      );
    message.channel.send(
      "Retrouve le bot sur **INTERNET** (<https://mr-bot.tech-ludo.fr/>) \n ou retrouve le sur **GITHUB** (<https://github.com/Ludo-code/Mr_BOT/>) \n ou rejoint notre **SERVEUR DISCORD** pour de l'aide ou autres (<https://discord.gg/4z5zvdae7r>) \n\n Le bot est actuellement sur **" +
        `${client.guilds.cache.size} ` +
        "serveurs**. \n\n Le bot a été crée par Ludovic 19 ans."
    );
  }
}
module.exports = infobotcommands;
