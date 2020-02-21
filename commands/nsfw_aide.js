const { RichEmbed } = require("discord.js");

module.exports = (client, message) => {
  const embed = new RichEmbed()
    .setColor("#ff00dc")
    .setTitle("Aide sur les commandes nsfw du bot Mr_BOT [funny bot] :")

    .addField(
      "Commande nekonue :",
      "m****nekonue*** Envoie une image de neko nu."
    )

    .addField("Commande hentai :", "m****hentai*** Envoie une image de hentai.")

    .addField("Commande yuri :", "m****yuri*** Envoie une image de yuri.")

    .addField("Commande ejac :", "m****ejac*** Permet d'éjaculer sur quelqu'un.")

    .addField("Commande chatte_gif :", "m****chatte_gif*** Envoie une gif de chatte.")

    .addField("Commande chatte :", "m****chatte*** Envoie une image de chatte.")

    .addField("Commande cuni :", "m****cuni*** Envoie une gif d'une personne qui fait un cuni.")

    .addField("Commande tetons :", "m****tetons*** Envoie une image de tétons de type féminin.")

    .addField("Commande neko_gif :", "m****neko_gif*** Envoie une gif de neko nue.")

    .addField("Commande masturbation :", "m****masturbation*** Envoie une gif de fille se masturbant.")

    .addField("Commande hentai_gif :", "m****hentai_gif*** Envoie une gif de hentai aléatoire.")

    .addField("Commande pied_gif :", "m****pied_gif*** Envoie une gif de pied.")

    .addField("Commande pied :", "m****pied*** Envoie une image de pied.")

    .addField("Commande seins :", "m****seins*** Envoie une paire de seins.");

  message.author.send(embed);
  message.channel.send(`${message.author} La liste des commandes d'aide ta été envoyé en message privé !`);
  return message.react("✉")
    .then(() => message.react("📩"))
    .then(() => message.react("📫"))
    .then(() => message.react("✅"));
};
