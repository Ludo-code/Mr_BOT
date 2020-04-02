const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
  if (message.channel.type === "dm")
    return message.reply(
      "Mais tu en a pas marre espèce de vieux pervers mes MP ne sont pas une poubelle commande bloqué ! :joy:"
    );
  message
    .delete({ timeout: 3000 })
    .then(
      console.log(
        `La commande domination féminine a été exécuté par ${message.author.tag} de l'id : ${message.author}`
      )
    );
  if (!message.channel.nsfw)
    return message.channel.send(
      `Désolé ${message.author} mais tu ne peux faire cette commande que dans un salon nsfw !`
    );
  const chatteimg = await fetch("https://nekos.life/api/v2/img/femdom")
    .then(res => res.json())
    .then(json => json.url);

  const embed = new MessageEmbed()
    .setImage(chatteimg)
    .setFooter(`Demandé par ${message.author.username}`)
    .setTimestamp();
  message.channel.send(embed);
};
