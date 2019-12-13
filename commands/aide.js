const { RichEmbed } = require("discord.js");

module.exports = (client, message) => {
  const embed = new RichEmbed()
    .setColor("#ff00dc")
    .setTitle(`Aide sur les commandes du serveur ${message.guild.name} :`)
    .addField("Commande meme :", "****meme*** pour afficher un meme aléatoire.")
    .addField("Commande neko :", "****neko*** pour afficher une image de neko.")
    .addField(
      "Commande embrasse :",
      "****embrasse*** pour embrasser quelqu'un."
    )
    .addField("Commande crie :", "****crie*** pour crier sur quelqu'un.")
    .addField(
      "Commande tapote :",
      "****tapote*** pour faire une petite tape a quelqu'un."
    )
    .addField("Commande gifle :", "****gifle*** pour gifler quelqu'un.")
    .addField("Commande calin :", "****calin*** pour câliner quelqu'un.")
    .addField(
      "Commande panda :",
      "****panda*** pour afficher une image de panda aléatoire."
    )
    .addField(
      "Commande info-serv",
      "****info-serv*** permet de savoir certaine informations sur le serveur comme sa date de création et son créateur."
    )
    .addField(
      "Commande aide :",
      "****aide*** permet de montrer cet aide sur les commandes."
    )
    .addField("Commande aide_nsfw :", "****aide_nsfw*** Envoie la page d'aide des commandes NSFW.")
    
    .setThumbnail(message.guild.iconURL);
  message.channel.send(embed);
};
