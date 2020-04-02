const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = async (client, message, args) => {
  if (message.channel.type === "dm") return message.reply("Oh tu veux faireun câlin c'est trop mignon mais juste a toi même tu dois vraiment être narcissique heuresement que la commande est non disponible en MP ! :joy:");
  const user =
    message.mentions.users.first() || message.guild.members.get(args[0]);
  message
    .delete({ timeout: 3000 })
    .then(console.log("Un message a été supprimé !"));
  const embrasse = await fetch("https://nekos.life/api/v2/img/hug")
    .then(res => res.json())
    .then(json => json.url);

  const embed = new MessageEmbed()
    .setTitle(`${message.author.tag} câline ${user.tag}`)
    .setImage(embrasse)
    .setFooter(`Demandé par ${message.author.username}`)
    .setTimestamp();
  message.channel.send(embed);
};
