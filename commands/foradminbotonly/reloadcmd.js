const { Command } = require("discord-akairo");

class reloadcommands extends Command {
  constructor() {
    super("reload", {
      aliases: ["reload"],
      split: "sticky",
      ownerOnly: true
    });
  }
  
  async exec(message) {

this.handler.reloadAll();

await message.channel.send("Toute les commandes ont été rechargé !")


  }
}
module.exports = reloadcommands;
