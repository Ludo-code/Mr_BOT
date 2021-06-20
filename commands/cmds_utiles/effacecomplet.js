const { Command } = require("discord-akairo");

class effacecompletcommands extends Command {
  constructor() {
    super("efface complet", {
      aliases: ["efface_complet"],
      split: "sticky",
      clientPermissions: ["SEND_MESSAGES", "MANAGE_MESSAGES", "MANAGE_CHANNELS"]
    });
  }

  async exec(message) {

    message.channel.send("Commande en construction, inutilisable pour le moment.")
    if (message.channel.type === "dm") {
      message.reply("Inutile en mp !");
    }


  }
}
module.exports = effacecompletcommands;
