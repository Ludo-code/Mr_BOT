const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const { Command } = require("discord-akairo");

class nekocommands extends Command {
  constructor() {
    super("neko", {
      aliases: ["neko"],
      split: "sticky"
    });
  }

  async exec(message) {
    if (message.channel.type === "dm") return message.reply("Oh un neko bon c'est des images un peux chaude défois mais ça ne t'authorise pas a l'exécuter en MP ! :joy:");
    console.log(`La commande neko a été exécuté par ${message.author.tag} de l'id : ${message.author}`);
    const neko = await fetch("https://nekos.life/api/v2/img/neko")
      .then(res => res.json())
      .then(json => json.url);

    const embed = new MessageEmbed()
      .setTitle("L'image ne s'affiche pas clique ici !").setURL(`${neko}`)
      .setImage(neko)
      .setFooter(`Demandé par ${message.author.username}`)
      .setTimestamp();
    message.channel.send(embed);
  }
}
module.exports = nekocommands;
