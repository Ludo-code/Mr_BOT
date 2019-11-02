const { RichEmbed } = require("discord.js");

module.exports = (client, message) => {
  const embed = new RichEmbed()
    .setColor("#ff00dc")
    .setTitle("Information sur le serveur :")
    .addField("Nom du serveur :", message.guild.name)
    .setThumbnail(message.guild.iconURL)
    .addField("Nombres de membres :", message.guild.memberCount, true)
    .addField("Crée par : ", message.guild.owner.user.tag, true)
    .addField("Serveur crée le :", message.guild.createdAt)
    .addField("Vous avez rejoint le :", message.member.joinedAt);
  message.channel.send(embed);
};
