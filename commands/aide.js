const { RichEmbed } = require("discord.js");

module.exports = (client, message) => {
  const embed = new RichEmbed()
    .setColor("#ff00dc")
    .setTitle(`Aide sur les commandes du serveur ${message.guild.name} :`)
    .addField("Commande meme :", "m****meme*** pour afficher un meme aléatoire.")
    .addField("Commande neko :", "m****neko*** pour afficher une image de neko.")
    .addField(
      "Commande embrasse :",
      "m****embrasse*** pour embrasser quelqu'un."
    )
    .addField("Commande crie :", "m****crie*** pour crier sur quelqu'un.")
    .addField(
      "Commande tapote :",
      "m****tapote*** pour faire une petite tape a quelqu'un."
    )
    .addField("Commande gifle :", "m****gifle*** pour gifler quelqu'un.")
    .addField("Commande calin :", "m****calin*** pour câliner quelqu'un.")
    .addField(
      "Commande panda :",
      "m****panda*** pour afficher une image de panda aléatoire."
    )
    .addField(
      "Commande urss",
      "m****urss*** permet d'avoir une image et un texte en rapport avec le communisme."
    )
    .addField(
      "Commande info-serv",
      "m****info-serv*** permet de savoir certaine informations sur le serveur comme sa date de création et son créateur."
    )
    .addField(
      "Commande aide :",
      "m****aide*** permet de montrer cet aide sur les commandes."
    )
    .addField(
      "Commande aide_nsfw :",
      "m****aide_nsfw*** Envoie la page d'aide des commandes NSFW."
    )

    .setThumbnail(message.guild.iconURL);
  message.author.send(embed);
  message.channel.send(`${message.author} La liste des commandes d'aide ta été envoyé en message privé !`).then(m => m.react("📩").then(m.react("✉")));
};
