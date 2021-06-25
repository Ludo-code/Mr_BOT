const { Command } = require("discord-akairo");
const fetch = require("node-fetch");

class eteindrecommands extends Command {
  constructor() {
    super("éteindre", {
      aliases: ["eteindre", "éteindre"],
      split: "sticky",
      ownerOnly: true,
    });
  }

  async exec(message) {
    const client = this.client;
    function eteindrelebot() {
      process.exit();
    }
    message.channel.send("Le signal d'extinction à été envoyé !");
    client.channels.cache
      .get("682318351049294012")
      .send("Le bot à été éteint !!!")
      .then(console.log("Bot éteint !!!"));
    setTimeout(eteindrelebot, 10000);
  }
}
module.exports = eteindrecommands;
