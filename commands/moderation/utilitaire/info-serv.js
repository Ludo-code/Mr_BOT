const { RichEmbed } = require("discord.js");

module.exports = (client, message) => {
  if (message.channel.type === "dm") return message.channel.send("Désolé mais tu ne peux pas faire de commande en message privé cela serait inutile :joy: !");
  const embed = new RichEmbed()
    .setColor("#ff00dc")
    .setTitle("Information sur le serveur :")
    .addField("Nom du serveur :", message.guild.name)
    .setThumbnail(message.guild.iconURL)
    .addField("Nombres de membres :", message.guild.memberCount, true)
    .addField("Crée par : ", message.guild.owner.user.tag, true)
    .addField("Serveur crée le :", message.guild.createdAt)
    .addField("Vous avez rejoint le :", message.member.joinedAt)
    .setFooter(`Demandé par ${message.author.username}`);
  message.channel.send(embed);
};
