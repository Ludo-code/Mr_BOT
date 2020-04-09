const { MessageEmbed } = require("discord.js");
const { Command } = require("discord-akairo");
class infoservcommands extends Command {
  constructor() {
    super("info-serv", {
      aliases: ["info-serv", "is", "i-s"],
      split: "sticky"
    });
  }

  exec(message) {
    if (message.channel.type === "dm") return message.channel.send("Ah ah c'était donc toi le petit mâlin qui essayais de faire crasher mon bot mais maintenant je te tient ! :joy:").then(`La commande info-serv a été exécuté par ${message.author.tag} de l'id : ${message.author}`);

    message.guild.members.fetch().then(fetchedMembers => {
      const botutilisateur = fetchedMembers.filter(membre => membre.user.bot === "true");
      const serveurprotectlevel = ["None", "Low", "Medium", "High", "Max"];
      const embed = new MessageEmbed()
        .setColor("#ff00dc")
        .setTitle("Information sur le serveur :")
        .addField("Nom du serveur :", message.guild.name, true)
        .addField("Id du serveur :", message.guild.id, true)
        .setThumbnail(message.guild.iconURL)
        .addField("Nombres de membres :", message.guild.memberCount, true)
        .addField("Nombre de bot :", botutilisateur.size)
        .addField("Propiétaire actuelle : ", message.guild.owner.user.tag, true)
        .addField("Serveur crée le :", message.guild.createdAt)
        .addField("Vous avez rejoint le :", message.member.joinedAt)
        .setFooter(`Demandé par ${message.author.username}`)
        .setTimestamp();
      message
        .channel.send(embed)
        .then(console.log(
          `La commande info-serv a été exécuté par ${message.author.tag} de l'id : ${message.author}`
        ));
    });
  }
}
module.exports = infoservcommands;
