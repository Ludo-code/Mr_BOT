const { Command } = require("discord-akairo");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

class piedgifcommands extends Command {
  constructor() {
    super("pied_gif", {
      aliases: ["pied_gif"],
      split: "sticky",
      clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    });
  }

  async exec(message) {
    if (message.channel.type === "dm")
      return message.reply(
        "Fétichiste OK, mais fétichiste des pieds bah je suis toujours ok en faite sauf pour que tu fasse cette commande en MP ! :joy:"
      );
    if (!message.channel.nsfw)
      return message.channel.send(
        `Désolé ${message.author} mais tu ne peux faire cette commande que dans un salon nsfw !`
      );

    const piedgif = await fetch("https://nekos.life/api/v2/img/feetg")
      .then((res) => res.json())
      .then((json) => json.url);

    const embed = new MessageEmbed()
      .setTitle("L'image ne s'affiche pas clique ici !")
      .setURL(`${piedgif}`)
      .setImage(piedgif)
      .setFooter(`Demandé par ${message.author.username}`)
      .setTimestamp();
    message.channel
      .send(embed)
      .then(
        console.log(
          `La commande pied_gif a été exécuté par ${message.author.tag} de l'id : ${message.author}`
        )
      );
  }
}
module.exports = piedgifcommands;
