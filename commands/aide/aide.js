const { MessageEmbed } = require("discord.js");
const { Command } = require("discord-akairo");
const paginationEmbed = require("discord.js-pagination");

class aidefrcommands extends Command {
  constructor() {
    super("aide", {
      aliases: ["aide"],
      split: "sticky",
      clientPermissions: ["SEND_MESSAGES", "ADD_REACTIONS", "VIEW_CHANNEL"],
    });
  }

  exec(message) {
    if (message.channel.type === "dm")
      return message.reply(
        "L'aide directement dans les MP non je t'invite plutôt a allez dans un serveur ou je suis présent et tu exécute la commande m*aide ! :joy:"
      );

    const page1 = new MessageEmbed()
      .setColor("#ff00dc")
      .setTitle("Aide sur les commandes du bot Mr_BOT [page 1] :")
      .setDescription(
        "**Information Importante :**\nVous pouvez utiliser M* à la place de m* si vous êtes sur mobile ou pas."
      )
      .addField("Commande aide :", "m****aide*** Affiche cette page d'aide.")
      .addField(
        "Commande aide_nsfw :",
        "m****aide_nsfw*** Envoie la page d'aide des commandes NSFW."
      )
      .addField(
        "Commande bug :",
        "m****bug*** pour envoyer un message si vous avez un problème avec le bot."
      )
      .addField(
        "Commande idee :",
        "m****idee*** pour suggérer une idée d'amélioration au bot."
      )
      .addField(
        "Commande changelog :",
        "m****changelog*** pour avoir le log de la mise a jour du bot."
      )
      .setTimestamp();

    const page2 = new MessageEmbed()
      .setColor("#ff00dc")
      .setTitle("Aide sur les commandes du bot Mr_BOT [page 2] :")
      .setDescription(
        "**Information Importante :**\nVous pouvez utiliser M* à la place de m* si vous êtes sur mobile ou pas."
      )
      .addField("Commande vote :", "m****vote*** permet de votez pour le bot")
      .addField(
        "Commande loli :",
        "m****loli*** affiche des phrases **humoristique** sur les loli"
      )
      .addField(
        "Commande meme :",
        "m****meme*** pour afficher un meme aléatoire."
      )
      .addField(
        "Commande neko :",
        "m****neko*** pour afficher une image de neko."
      )
      .addField(
        "Commande embrasse :",
        "m****embrasse*** pour embrasser quelqu'un."
      )
      .setTimestamp();

    const page3 = new MessageEmbed()
      .setColor("#ff00dc")
      .setTitle("Aide sur les commandes du bot Mr_BOT [page 3] :")
      .setDescription(
        "**Information Importante :**\nVous pouvez utiliser M* à la place de m* si vous êtes sur mobile ou pas."
      )
      .addField("Commande pleure :", "m****pleure*** permet de pleurer.")
      .addField(
        "Commande tapote :",
        "m****tapote*** pour faire une petite tape a quelqu'un."
      )
      .addField("Commande gifle :", "m****gifle*** pour gifler quelqu'un.")
      .addField("Commande calin :", "m****calin*** pour câliner quelqu'un.")
      .addField(
        "Commande bonne nuit :",
        "m****bonne_nuit*** permet de souhaiter bonne nuit a un utilisateur spécifié ou a tous le monde."
      )
      .setTimestamp();

    const page4 = new MessageEmbed()
      .setColor("#ff00dc")
      .setTitle("Aide sur les commandes du bot Mr_BOT [page 4] :")
      .setDescription(
        "**Information Importante :**\nVous pouvez utiliser M* à la place de m* si vous êtes sur mobile ou pas."
      )
      .addField(
        "Commande panda :",
        "m****panda*** pour afficher une image de panda aléatoire."
      )
      .addField(
        "Commande chat :",
        "m****chat*** pour afficher une image de chat aléatoire."
      )
      .addField(
        "Commande info-serv",
        "m****info-serv*** permet de savoir certaine informations sur le serveur comme sa date de création et son créateur."
      )
      .addField(
        "Commande info-utilisateur :",
        "m****info-utilisateur*** pour avoir les informations de l'utilisateur demandé ou de sois même."
      )
      .addField(
        "Commande avatar :",
        "m****avatar*** pour avoir l'avatar de la personne demandé."
      )
      .setTimestamp();

    const page5 = new MessageEmbed()
      .setColor("#ff00dc")
      .setTitle("Aide sur les commandes du bot Mr_BOT [page 5] :")
      .setDescription(
        "**Information Importante :**\nVous pouvez utiliser M* à la place de m* si vous êtes sur mobile ou pas."
      )
      .addField(
        "Commande dire :",
        "m****dire*** ou m****dis*** permet de répéter ce qu'on a mis dans notre message."
      )
      .addField(
        "Commande info-bot :",
        "m****info-bot*** pour avoir des informations sur le bot et son créateur."
      )
      .addField(
        "Commande enculus-revulus :",
        "m****enculus-revulus*** pour savoir qui est le plus gros enculus."
      )
      .addField(
        "Commande effacer :",
        "m****effacer*** ou m****efface*** permet d'effacer le nombre de message désiré."
      )
      .addField(
        "Commande efface_complet :",
        "m****efface_complet*** permet d'effacer tout les messages d'un salon."
      )
      .setTimestamp();

    const page6 = new MessageEmbed()
      .setColor("#ff00dc")
      .setTitle("Aide sur les commandes du bot Mr_BOT [page 6] :")
      .setDescription(
        "**Information Importante :**\nVous pouvez utiliser M* à la place de m* si vous êtes sur mobile ou pas."
      )
      .addField(
        "Commande ticket-install : ",
        "m****ticket-install*** permet d'initialiser le système de ticket sur le serveur."
      )
      .addField(
        "Commande fermer : ",
        "m****fermer*** permet a un administrateur de fermer le ticket."
      )
      .addField(
        "Commande ping :",
        "m****ping*** permet de voir la latence du bot."
      )
      .setTimestamp();

    const pages = [page1, page2, page3, page4, page5, page6];

    const emoji = ["⏪", "⏩"];

    const timeout = "30000";

    paginationEmbed(message, pages, emoji, timeout);
  }
}
module.exports = aidefrcommands;
