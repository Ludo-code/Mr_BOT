const { MessageEmbed } = require("discord.js");

module.exports = (client, message) => {
  if (message.channel.type === "dm") return message.channel.send("Ah ah c'était donc toi le petit mâlin qui essayais de faire crasher mon bot mais maintenant je te tient ! :joy:").then(`La commande info-serv a été exécuté par ${message.author.username} de l'id : ${message.author}`);
  const embed = new MessageEmbed()
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
