const { MessageEmbed } = require("discord.js");
const { Command } = require("discord-akairo");

class infoservcommands extends Command {
  constructor() {
    super("info-serv", {
      aliases: ["info-serv"],
      split: "sticky"
    });
  }

  exec(message) {
    if (message.channel.type === "dm") return message.channel.send("Ah ah c'était donc toi le petit mâlin qui essayais de faire crasher mon bot mais maintenant je te tient ! :joy:").then(`La commande info-serv a été exécuté par ${message.author.tag} de l'id : ${message.author}`);

    message.guild.members.fetch().then(fetchedMembers => {
      const botutilisateur = fetchedMembers.filter(membre => membre.user.bot === true);
      message.guild.members.fetch().then(membresfetch => {
        const enligne = membresfetch.filter(membre => membre.presence.status !== "offline");
        const embed = new MessageEmbed()
          .setColor("#ff00dc")
          .setTitle("Information sur le serveur :")
          .addField("Nom du serveur :", message.guild.name, true)
          .addField("Id du serveur :", message.guild.id, true)
          .setThumbnail(message.guild.iconURL())
          .addField("Nombres de membres :", message.guild.memberCount)
          .addField("Nombre de bot :", botutilisateur.size, true)
          .addField("membres en ligne :", enligne.size, true)
          .addField("Propiétaire actuelle : ", message.guild.owner.user.tag)
          .addField("Nombre de salon :", message.guild.channels.cache.filter(salon => salon.type !== "category").size, true)
          .addField("Nombre de salon textuelles :", message.guild.channels.cache.filter(salon => salon.type === "text").size, true)
          .addField("Nombre de salon vocaux :", message.guild.channels.cache.filter(salon => salon.type === "voice").size, true)
          .addField("Nombre de rôle :", message.guild.roles.cache.size)
          .addField("Tout les rôles disponible :", message.guild.roles.cache.map(role => role.name).join(", ") || "none")
          .addField("Vous avez rejoint le :", message.member.joinedAt)
          .setFooter(`Demandé par ${message.author.username}`)
          .setTimestamp();
        message.channel.send(embed);
      });
    });
  }
}
module.exports = infoservcommands;
