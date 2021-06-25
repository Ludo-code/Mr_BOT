const { Command } = require("discord-akairo");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

class masturbcommands extends Command {
  constructor() {
    super("masturbation", {
      aliases: ["masturbation"],
      split: "sticky",
      clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    });
  }

  async exec(message) {
    if (message.channel.type === "dm")
      return message.reply("Bah alors la masturbation t'excite ?! :joy:");
    if (!message.channel.nsfw)
      return message.channel.send(
        `Désolé ${message.author} mais tu ne peux faire cette commande que dans un salon nsfw !`
      );

    const masturbation = await fetch("https://nekos.life/api/v2/img/pwankg")
      .then((res) => res.json())
      .then((json) => json.url);

    const embed = new MessageEmbed()
      .setTitle("L'image ne s'affiche pas clique ici !")
      .setURL(`${masturbation}`)
      .setImage(masturbation)
      .setFooter(`Demandé par ${message.author.username}`)
      .setTimestamp();
    message.channel
      .send(embed)
      .then(
        console.log(
          `La commande masturbation a été exécuté par ${message.author.tag} de l'id : ${message.author}`
        )
      );
  }
}
module.exports = masturbcommands;
