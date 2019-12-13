const { RichEmbed } = require("discord.js");

module.exports = (client, message) => {
  const embed = new RichEmbed()
    .setColor("#ff00dc")
    .setTitle(`Aide sur les commandes du serveur ${message.guild.name} :`)
    
    .addField("Commande nekonue :", "****nekonue*** Envoie une image de neko nu.")
    .addField("Commande hentai :", "****hentai*** Envoie une image de hentai.")
    .addField("Commande yuri :", "****yuri*** Envoie une image de yuri.")
    .addField("Commande lesbienne :", "****lesbienne*** Envoie une image de lesbienne.")
    .addField("Commande ejac :", "****ejac*** Permet d'éjaculer sur quelqu'un.")
    .addField("Commande chatte :", "****chatte*** Envoie une image de chatte.")
    .addField("Commande seins :", "****seins*** Envoie une paire de seins.")
    .setThumbnail(message.guild.iconURL);
  message.channel.send(embed);
};
