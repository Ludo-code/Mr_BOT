const { Command } = require("sheweny");
const fetch = import("node-fetch");
const { MessageEmbed } = require("discord.js");

class memecommands extends Command {
  constructor(client) {
    super(client, {
      name: "meme",
      description: "Permet d'envoyer une image de meme aléatoire",
      aliases: ["meme"],
      split: "sticky",
      userPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    });
  }

  async exec(message) {
    if (message.channel.type === "dm")
      return message.reply(
        "Un meme ça a rien de méchant mais je la bloque quand même dans mes MP désolé ! :joy:"
      );
    const meme = await fetch("https://some-random-api.ml/meme")
      .then((res) => res.json())
      .then((json) => json.image);

    const embed = new MessageEmbed()
      .setTitle("L'image ne s'affiche pas clique ici !")
      .setURL(`${meme}`)
      .setImage(meme)
      .setFooter(`Demandé par ${message.author.username}`)
      .setTimestamp();
    message.channel.send(embed);
  }
}
module.exports = memecommands;
