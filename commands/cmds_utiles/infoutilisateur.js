const { MessageEmbed } = require("discord.js");
const { Command } = require("discord-akairo");

class infoutilisateurcommands extends Command {
  constructor() {
    super("info-utilisateur", {
      aliases: ["info-utilisateur"],
      split: "sticky",
      clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    });
  }

  exec(message) {
    if (message.channel.type === "dm")
      return message.channel
        .send(
          "Ah ah c'était donc toi le petit mâlin qui essayais de faire crasher mon bot mais maintenant je te tient ! :joy:"
        )
        .then(
          `La commande info-serv a été exécuté par ${message.author.tag} de l'id : ${message.author}`
        );

    const user = message.mentions.users.first() || message.author;
    const formateedate = function (date) {
      return new Intl.DateTimeFormat("fr").format(date);
    };
    message.guild.members.fetch(user.id).then((utilisateur) => {
      const arejointle = formateedate(utilisateur.joinedAt);
      const avatarutilisateur = user.displayAvatarURL();
      const nommention = user.username;
      const utilisateurnickname = message.guild.members.cache.get(user.id)
        .nickname;
      const discriminateur = user.tag;
      const idmention = user.id;
      let statutdelapersonne = user.presence.status;
      const inscription = message.guild.members.cache.get(user.id).user
        .createdAt;
      const mois = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
      ];
      const dateformatee =
        inscription.getDate() +
        " " +
        mois[inscription.getMonth()] +
        " " +
        inscription.getFullYear();

      const statusFr = {
        dnd: "Ne pas déranger",
        online: "En ligne",
        idle: "AFK",
        offline: "Déconnecté",
      };
      const nickornot = utilisateurnickname || "Aucun Pseudonyme";

      const embed = new MessageEmbed()
        .setColor("#ff00dc")
        .addField("**Information sur :**", nommention)
        .addField("Pseudonyme : ", nickornot)
        .addField("Présence en ligne : ", statusFr[statutdelapersonne], true)
        .setThumbnail(avatarutilisateur)
        .addField("À rejoint le :", arejointle)
        .addField("Tag Discord", discriminateur)
        .addField(`Id de : ${nommention}`, idmention)
        .addField("Compte crée le : ", dateformatee)
        .setFooter(`Demandé par ${message.author.username}`)
        .setTimestamp();
      message.channel.send(embed);
    });
  }
}
module.exports = infoutilisateurcommands;
