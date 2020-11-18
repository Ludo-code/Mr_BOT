const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const { Command } = require("discord-akairo");

class memecommands extends Command {
  constructor() {
    super("meme", {
      aliases: ["meme"],
      split: "sticky"
    });
  }

  async exec(message) {
    if (message.channel.type === "dm") return message.reply("Un meme ça a rien de méchant mais je la bloque quand même dans mes MP désolé ! :joy:");
    const meme = await fetch("https://some-random-api.ml/meme")
      .then(res => res.json())
      .then(json => json.image);

    const embed = new MessageEmbed()
      .setTitle("L'image ne s'affiche pas clique ici !").setURL(`${meme}`)
      .setImage(meme)
      .setFooter(`Demandé par ${message.author.username}`)
      .setTimestamp();
    message.channel.send(embed);
  }
}
module.exports = memecommands;
