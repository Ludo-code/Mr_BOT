const { Command } = require("sheweny");

class effacecompletcommands extends Command {
  constructor(client) {
    super(client, {
      name: "effacecomplet",
      description: "Efface tout le contenu d'un channel",
      aliases: ["efface_complet"],
      split: "sticky",
      userPermissions: [
        "SEND_MESSAGES",
        "MANAGE_MESSAGES",
        "MANAGE_CHANNELS",
        "VIEW_CHANNEL",
      ],
    });
  }

  async exec(message) {
    message.channel.send(
      "Commande en construction, inutilisable pour le moment."
    );
    if (message.channel.type === "dm") {
      message.reply("Inutile en mp !");
    }
  }
}
module.exports = effacecompletcommands;
