const { RichEmbed } = require("discord.js");

module.exports = (client, message) => {
  const embed = new RichEmbed()
    .setColor("#ff00dc")
    .setTitle(`Aide sur les commandes du serveur ${message.guild.name} :`)
    .addField(
      "Commande repeat :",
      "****repeat*** pour répeter le message mis aprés le repeat."
    )
    .addField(
      "Commande role_mettre :",
      "****role_mettre*** permet de s'ajouter un role a soit même."
    )
    .addField(
      "Commande info-serv",
      "****info-serv*** permet de savoir certaine informations sur le serveur comme sa date de création et son créateur."
    )
    .addField(
      "Commande aide :",
      "****aide*** permet de montrer cet aide sur les commandes."
    )
    .setThumbnail(message.guild.iconURL);
  message.channel.send(embed);
};
