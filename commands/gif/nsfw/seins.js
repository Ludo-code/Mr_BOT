const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
  if (message.channel.type === "dm") return message.reply("Tu as raison rien de tel que une bonne paire de seins mais dans un serveur discord pas dans mes MP merci ! :joy:");
  message
    .delete({ timeout: 3000 })
    .then(console.log(`La commande seins a été exécuté par ${message.author.username} de l'id : ${message.author}`));
  if (!message.channel.nsfw) return message.channel.send(`Désolé ${message.author} mais tu ne peux faire cette commande que dans un salon nsfw !`);
  const neko = await fetch("https://nekos.life/api/v2/img/boobs")
    .then(res => res.json())
    .then(json => json.url);

  const embed = new MessageEmbed()
    .setImage(neko)
    .setFooter(`Demandé par ${message.author.username}`);
  message.channel.send(embed);
};
