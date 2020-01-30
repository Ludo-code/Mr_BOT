const { RichEmbed } = require("discord.js");

module.exports = (client, message) => {
  const embed = new RichEmbed()
    .setColor("#ff00dc")
    .setTitle(`Aide sur les commandes du serveur ${message.guild.name} :`)

    .addField(
      "Commande nekonue :",
      "****nekonue*** Envoie une image de neko nu."
    )

    .addField("Commande hentai :", "****hentai*** Envoie une image de hentai.")

    .addField("Commande yuri :", "****yuri*** Envoie une image de yuri.")

    .addField("Commande ejac :", "****ejac*** Permet d'éjaculer sur quelqu'un.")

    .addField("Commande chatte_gif :", "****chatte_gif*** Envoie une gif de chatte.")

    .addField("Commande chatte :", "****chatte*** Envoie une image de chatte.")

    .addField("Commande cuni :", "****cuni*** Envoie une gif d'une personne qui fait un cuni.")

    .addField("Commande tetons :", "****tetons*** Envoie une image de tétons de type féminin.")

    .addField("Commande neko_gif :", "****neko_gif*** Envoie une gif de neko nue.")

    .addField("Commande masturbation :", "****masturbation*** Envoie une gif de fille se masturbant.")

    .addField("Commande rdm_hentai :", "****rdm_hentai*** Envoie une gif de hentai aléatoire.")

    .addField("Commande pied_gif :", "****pied_gif*** Envoie une gif de pied.")

    .addField("Commande pied :", "****pied*** Envoie une image de pied.")

    .addField("Commande seins :", "****seins*** Envoie une paire de seins.")

    .setThumbnail(message.guild.iconURL);
  message.author.send(embed);
  message.channel.send(`${message.author} La liste des commandes d'aide ta été envoyé en message privé !`).then(m => m.react("✉").then(m.react("📩")));
};
