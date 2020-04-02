const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
  if (message.channel.type === "dm") return message.reply("Un meme ça a rien de méchant mais je la bloque quand même dans mes MP désolé ! :joy:");
  message
    .delete({ timeout: 3000 })
    .then(console.log(`La commande meme a été exécuté par ${message.author.username} de l'id : ${message.author}`));
  const meme = await fetch("https://meme-api.herokuapp.com/gimme")
    .then(res => res.json())
    .then(json => json.url);

  const embed = new MessageEmbed()
    .setImage(meme)
    .setFooter(`Demandé par ${message.author.username}`)
    .setTimestamp();
  message.channel.send(embed);
};
