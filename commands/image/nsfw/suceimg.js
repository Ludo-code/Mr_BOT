const { Command } = require("discord-akairo");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

class suceimgcommands extends Command {
  constructor() {
    super("suce_img", {
      aliases: ["suce_img"],
      split: "sticky"
    });
  }

  async exec(message) {
    if (message.channel.type === "dm") return message.reply("Eh bah maintenant aprés avoir tantés de faire des gifs de hentai en privé tu essaye les images alala tu est vriament incorigible mais toujours pas authorisé en MP ! :joy:");

    if (message.channel.type === "dm") return message.reply("Mais tu en a pas marre espèce de vieux pervers mes MP ne sont pas une poubelle commande bloqué ! :joy:");
    const suceimg = await fetch("https://nekos.life/api/v2/img/blowjob")
      .then(res => res.json())
      .then(json => json.url);

    const embed = new MessageEmbed()
      .setTitle("L'image ne s'affiche pas clique ici !").setURL(`${suceimg}`)
      .setImage(suceimg)
      .setFooter(`Demandé par ${message.author.username}`)
      .setTimestamp();
    message.channel.send(embed).then(console.log(`La commande suce_img a été exécuté par ${message.author.tag} de l'id : ${message.author}`));
  }
}
module.exports = suceimgcommands;
