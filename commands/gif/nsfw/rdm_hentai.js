const fetch = require("node-fetch");
const { RichEmbed } = require("discord.js");

module.exports = async (client, message) => {
  if (message.channel.type === "dm") return message.reply("Alors on essaye de se cacher ! :joy:");
  message
    .delete({ timeout: 3000 })
    .then(console.log(`La commande hentai_gif a été exécuté par ${message.author.username} de l'id : ${message.author}`)); if (!message.channel.nsfw) return message.channel.send(`Désolé ${message.author} mais tu ne peux faire cette commande que dans un salon nsfw !`);
  const rdmhen = await fetch("https://nekos.life/api/v2/img/Random_hentai_gif")
    .then(res => res.json())
    .then(json => json.url);

  const embed = new RichEmbed()
    .setImage(rdmhen)
    .setFooter(`Demandé par ${message.author.username}`);
  message.channel.send(embed);
};
