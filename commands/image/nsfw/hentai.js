const { Command } = require("discord-akairo");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

class hentaiimgcommands extends Command {
  constructor() {
    super("hentai", {
      aliases: ["hentai", "hentaiimg"],
      split: "sticky"
    });
  }

  async exec(message) {
    if (message.channel.type === "dm") return message.reply("Eh bah maintenant aprés avoir tantés de faire des gifs de hentai en privé tu essaye les images alala tu est vriament incorigible mais toujours pas authorisé en MP ! :joy:");

    if (!message.channel.nsfw) return message.channel.send(`Désolé ${message.author} mais tu ne peux faire cette commande que dans un salon nsfw !`);
    const hentai = await fetch("https://nekos.life/api/v2/img/hentai")
      .then(res => res.json())
      .then(json => json.url);

    const embed = new MessageEmbed()
      .setTitle("L'image ne s'affiche pas clique ici !").setURL(`${hentai}`)
      .setImage(hentai)
      .setFooter(`Demandé par ${message.author.username}`)
      .setTimestamp();
    message.channel.send(embed).then(console.log(`La commande hentai a été exécuté par ${message.author.tag} de l'id : ${message.author}`));
  }
}
module.exports = hentaiimgcommands;
