const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const { Command } = require("discord-akairo");

class femdomcommands extends Command {
  constructor() {
    super("femdom", {
      aliases: ["femdom"],
      split: "sticky",
      clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
      category: "nsfw",
    });
  }

  async exec(message) {
    if (message.channel.type === "dm")
      return message.reply(
        "Mais tu en a pas marre espèce de vieux pervers mes MP ne sont pas une poubelle commande bloqué ! :joy:"
      );
    if (!message.channel.nsfw)
      return message.channel.send(
        `Désolé ${message.author} mais tu ne peux faire cette commande que dans un salon nsfw !`
      );

    const femdom = await fetch("https://nekos.life/api/v2/img/femdom")
      .then((res) => res.json())
      .then((json) => json.url);

    const embed = new MessageEmbed()
      .setTitle("L'image ne s'affiche pas clique ici !")
      .setURL(`${femdom}`)
      .setImage(femdom)
      .setFooter(`Demandé par ${message.author.username}`)
      .setTimestamp();
    message.channel
      .send(embed)
      .then(
        console.log(
          `La commande femdom a été exécuté par ${message.author.tag} de l'id : ${message.author}`
        )
      );
  }
}
module.exports = femdomcommands;
