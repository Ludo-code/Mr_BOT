const { Command } = require("discord-akairo");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

class seinscommands extends Command {
  constructor() {
    super("seins", {
      aliases: ["seins"],
      split: "sticky",
      clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    });
  }

  async exec(message) {
    if (message.channel.type === "dm")
      return message.reply(
        "Tu as raison rien de tel que une bonne paire de seins mais dans un serveur discord pas dans mes MP merci ! :joy:"
      );

    if (!message.channel.nsfw)
      return message.channel.send(
        `Désolé ${message.author} mais tu ne peux faire cette commande que dans un salon nsfw !`
      );
    const seins = await fetch("https://nekos.life/api/v2/img/boobs")
      .then((res) => res.json())
      .then((json) => json.url);

    const embed = new MessageEmbed()
      .setTitle("L'image ne s'affiche pas clique ici !")
      .setURL(`${seins}`)
      .setImage(seins)
      .setFooter(`Demandé par ${message.author.username}`)
      .setTimestamp();
    message.channel
      .send(embed)
      .then(
        console.log(
          `La commande seins a été exécuté par ${message.author.tag} de l'id : ${message.author}`
        )
      );
  }
}
module.exports = seinscommands;
