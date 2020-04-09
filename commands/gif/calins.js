const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
  if (message.channel.type === "dm") return message.reply("Oh tu veux faireun câlin c'est trop mignon mais juste a toi même tu dois vraiment être narcissique heuresement que la commande est non disponible en MP ! :joy:");
  const user = message.mentions.users.first().username;
  message
    .delete({ timeout: 3000 })
    .then(console.log(`La commande câlin a été exécuté par ${message.author.tag} de l'id : ${message.author}`));
  const calin = await fetch("https://nekos.life/api/v2/img/hug")
    .then(res => res.json())
    .then(json => json.url);

  const embed = new MessageEmbed()
    .setTitle(`${message.author.username} câline ${user}`)
    .setDescription(`[L'image ne s'affiche pas clique ici !](${calin})`)
    .setImage(calin)
    .setFooter(`Demandé par ${message.author.username}`)
    .setTimestamp();
  message.channel.send(embed);
};
