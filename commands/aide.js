const { MessageEmbed } = require("discord.js");

module.exports = (client, message) => {
  if (message.channel.type === "dm") return message.reply("L'aide directement dans les MP non je t'invite plutôt a allez dans un serveur ou je suis présent et tu exécute la commande m*aide ! :joy:");
  const embed = new MessageEmbed()
    .setColor("#ff00dc")
    .setTitle("Aide sur les commandes du bot Mr_BOT [funny bot] :")
    .addField(
      "Commande report :",
      "m****report*** pour report un problème avec le bot."
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
      "Commande tts :",
      "m****tts*** permet de répéter ce qu'on a mis dans notre message et le dire en vocal."
    )
    .addField(
      "Commande aide_nsfw :",
      "m****aide_nsfw*** Envoie la page d'aide des commandes NSFW."
    )
    .addField(
      "Commande info-bot :",
      "m****info-bot*** pour avoir des informations sur le bot et son créateur."
    )
    .setTimestamp();
  
  message.author.send(embed);
  message.channel
    .send(
      `${message.author} La liste des commandes d'aide ta été envoyé en message privé !`
    )
    .then(
      console.log(
        `La commande aide a été exécuté par ${message.author.tag} de l'id : ${message.author}`
      )
    );
  return message.react("✉")
    .then(() => message.react("📩"))
    .then(() => message.react("📫"))
    .then(() => message.react("✅"));
};
