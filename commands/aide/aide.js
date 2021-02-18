const { MessageEmbed } = require("discord.js");
const { Command } = require("discord-akairo");

class aidefrcommands extends Command {
  constructor() {
    super("aide", {
      aliases: ["aide"],
      split: "sticky"
    });
  }

  exec(message) {
    if (message.channel.type === "dm") return message.reply("L'aide directement dans les MP non je t'invite plutôt a allez dans un serveur ou je suis présent et tu exécute la commande m*aide ! :joy:");
    const embed = new MessageEmbed()
      .setColor("#ff00dc")
      .setTitle("Aide sur les commandes du bot Mr_BOT [funny bot] :")
      .addField(
        "**Information Importante :**",
        "Vous pouvez utiliser M* à la place de m* si vous êtes sur mobile ou pas."
      )
      .addField(
        "Commande aide :",
        "m****aide*** Affiche cette page d'aide."
      )
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
      .addField(
        "Commande ping :",
        "m****ping*** permet de voir la latence du bot."
      )
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
      .addField("Commande pleure :", "m****pleure*** permet de pleurer.")
      .addField(
        "Commande tapote :",
        "m****tapote*** pour faire une petite tape a quelqu'un."
      )
      .addField("Commande gifle :", "m****gifle*** pour gifler quelqu'un.")
      .addField("Commande calin :", "m****calin*** pour câliner quelqu'un.")
      .addField("Commande bonne nuit :", "m****bonne_nuit*** permet de souhaiter bonne nuit a un utilisateur spécifié ou a tous le monde.")
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
      .addField(
        "Commande aide :",
        "m****aide*** permet de montrer cet aide sur les commandes."
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

    message.author.send(embed);
    message.channel
      .send(
        `${message.author} La liste des commandes d'aide ta été envoyé en message privé !`
      );
      
    return message.react("✉")
      .then(() => message.react("📩"))
      .then(() => message.react("📫"))
      .then(() => message.react("✅"));
  }
}
module.exports = aidefrcommands;
