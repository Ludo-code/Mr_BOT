const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
  if (message.channel.type === "dm") return message.reply("Tient un fan de cuni qui n'assume pas et fais ça en MP allez t'inquiète pas je dirais rien ! :joy:");
  message
    .delete({ timeout: 3000 })
    .then(console.log(`La commande cuni a été exécuté par ${message.author.tag} de l'id : ${message.author}`));
  if (!message.channel.nsfw) return message.channel.send(`Désolé ${message.author} mais tu ne peux faire cette commande que dans un salon nsfw !`);
  const kuni = await fetch("https://nekos.life/api/v2/img/kuni")
    .then(res => res.json())
    .then(json => json.url);

  const embed = new MessageEmbed()
    .setImage(kuni)
    .setFooter(`Demandé par ${message.author.username}`)
    .setTimestamp();
  message.channel.send(embed);
};
