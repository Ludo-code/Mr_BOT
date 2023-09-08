const { Command } = require("sheweny");
const fetch = import("node-fetch");
const { MessageCollector } = require("discord.js");

class enculusrevuluscommands extends Command {
  constructor(client) {
    super(client, {
      name: "enculus-revulus",
      description: "Permet de troller un utilisateur",
      aliases: ["enculus-revulus"],
      split: "sticky",
      userPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
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
