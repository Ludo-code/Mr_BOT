const { MessageEmbed } = require("discord.js");
const { Command } = require("discord-akairo");
const paginationEmbed = require("discord.js-pagination");

class nsfwaidecommands extends Command {
  constructor() {
    super("aide_nsfw", {
      aliases: ["aide_nsfw"],
      split: "sticky",
      clientPermissions: ["SEND_MESSAGES", "ADD_REACTIONS", "VIEW_CHANNEL"],
    });
  }

  exec(message) {
    if (message.channel.type === "dm")
      return message.reply(
        "L'aide pour les commandes nsfw directement dans les MP non je t'invite plutôt a allez dans un serveur ou je suis présent et tu exécute la commande m*aide_nsfw ! :joy:"
      );

    const page1 = new MessageEmbed()
      .setColor("#ff00dc")
      .setTitle("Aide sur les commandes nsfw du bot Mr_BOT [page 1] :")
      .setDescription(
        "**Information Importante :**\nVous pouvez utiliser M* à la place de m* si vous êtes sur mobile ou pas."
      )
      .addField(
        "Commande nekonue :",
        "m****nekonue*** Envoie une image de neko nu."
      )
      .addField(
        "Commande hentai :",
        "m****hentai*** Envoie une image de hentai."
      )

      .addField("Commande yuri :", "m****yuri*** Envoie une image de yuri.")

      .addField("Commande yaoi :", "m****yaoi*** Envoie une image de yaoi.")

      .addField(
        "Commande ejac :",
        "m****ejac*** Permet d'éjaculer sur quelqu'un."
      )
      .setTimestamp();

    const page2 = new MessageEmbed()
      .setColor("#ff00dc")
      .setTitle("Aide sur les commandes nsfw du bot Mr_BOT [page 2] :")
      .setDescription(
        "**Information Importante :**\nVous pouvez utiliser M* à la place de m* si vous êtes sur mobile ou pas."
      )
      .addField(
        "Commande chatte_gif :",
        "m****chatte_gif*** Envoie une gif de chatte."
      )

      .addField(
        "Commande chatte :",
        "m****chatte*** Envoie une image de chatte."
      )

      .addField(
        "Commande cuni :",
        "m****cuni*** Envoie une gif d'une personne qui fait un cuni."
      )

      .addField(
        "Commande tetons :",
        "m****tetons*** Envoie une image de tétons de type féminin."
      )

      .addField(
        "Commande neko_gif :",
        "m****neko_gif*** Envoie une gif de neko nue."
      )
      .setTimestamp();

    const page3 = new MessageEmbed()
      .setColor("#ff00dc")
      .setTitle("Aide sur les commandes nsfw du bot Mr_BOT [page 3] :")
      .setDescription(
        "**Information Importante :**\nVous pouvez utiliser M* à la place de m* si vous êtes sur mobile ou pas."
      )
      .addField(
        "Commande masturbation :",
        "m****masturbation*** Envoie une gif de fille se masturbant."
      )

      .addField(
        "Commande hentai_gif :",
        "m****hentai_gif*** Envoie une gif de hentai aléatoire."
      )

      .addField(
        "Commande pied_gif :",
        "m****pied_gif*** Envoie une gif de pied."
      )

      .addField("Commande pied :", "m****pied*** Envoie une image de pied.")

      .addField("Commande seins :", "m****seins*** Envoie une paire de seins.")
      .setTimestamp();

    const page4 = new MessageEmbed()
      .setColor("#ff00dc")
      .setTitle("Aide sur les commandes nsfw du bot Mr_BOT [page 4] :")
      .setDescription(
        "**Information Importante :**\nVous pouvez utiliser M* à la place de m* si vous êtes sur mobile ou pas."
      )
      .addField(
        "Commande femdom :",
        "m****femdom*** Envoie une image de domination féminine."
      )
      .addField(
        "Commande suce :",
        "m****suce*** Permet de pouvoir sucer quelqu'un."
      )
      .addField(
        "Commande suce_img :",
        "m****suce_img*** Affiche une image de quelqu'un entrain de se faire sucer."
      )
      .setTimestamp();

    const pages = [page1, page2, page3, page4];

    const emoji = ["⏪", "⏩"];

    const timeout = "30000";

    paginationEmbed(message, pages, emoji, timeout);
  }
}
module.exports = nsfwaidecommands;
