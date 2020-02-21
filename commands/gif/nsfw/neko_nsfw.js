const fetch = require("node-fetch");
const { RichEmbed } = require("discord.js");

module.exports = async (client, message) => {
  message
    .delete({ timeout: 3000 })
    .then(console.log(`La commande nekonue a été exécuté par ${message.author.username} de l'id : ${message.author}`));
  if (!message.channel.nsfw) return message.channel.send(`Désolé ${message.author} mais tu ne peux faire cette commande que dans un salon nsfw !`);
  const neko = await fetch("https://neko-love.xyz/api/v1/nekolewd")
    .then(res => res.json())
    .then(json => json.url);

  const embed = new RichEmbed()
    .setImage(neko)
    .setFooter(`Demandé par ${message.author.username}`);
  message.channel.send(embed);
};
