const { Command } = require("discord-akairo");
const fetch = require("node-fetch");
const { MessageCollector } = require("discord.js");

class enculusrevuluscommands extends Command {
  constructor() {
    super("enculus-revulus", {
      aliases: ["enculus-revulus"],
      split: "sticky",
      clientPermissions: ["SEND_MESSAGES"],
    });
  }

  async exec(message) {
    if (message.channel.type === "dm")
      return message.reply(
        "Et bah tu ne peux faire cette commande en mp va savoir pourquoi !"
      );
    const filter = (m) => m.content.includes("");
    const collector = message.channel.createMessageCollector(filter, {
      time: 60000,
      max: 1,
    });

    collector.on("collect", (m) => {
      message.channel
        .send(`${m.author} tu est un enculé confirmé !`)
        .then(console.log(`Collected ${m.content}`));
    });
    collector.on("end", (collected) => {
      console.log(`Collected ${collected.size} items`);
    });
  }
}
module.exports = enculusrevuluscommands;
