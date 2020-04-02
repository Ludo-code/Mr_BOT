const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
  if (message.channel.type === "dm") return message.reply("Bon j'avoue tu veux un chat mais je suis désolé même cette commande je la bloque en MP ! :joy:");
  message
    .delete({ timeout: 3000 })
    .then(console.log(`La commande neko_gif a été exécuté par ${message.author.tag} de l'id : ${message.author}`));
  const chat = await fetch("http://aws.random.cat/meow")
    .then(res => res.json())
    .then(json => json.file);

  const embed = new MessageEmbed()
    .setImage(chat)
    .setFooter(`Demandé par ${message.author.username}`)
    .setTimestamp();
  message.channel.send(embed);
};
