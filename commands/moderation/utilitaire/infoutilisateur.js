const { MessageEmbed } = require("discord.js");
const { Command } = require("discord-akairo");

class infoutilisateurcommands extends Command {
  constructor() {
    super("info-utilisateur", {
      aliases: ["info-utilisateur"],
      split: "sticky"
    });
  }

  exec(message) {
    if (message.channel.type === "dm") return message.channel.send("Ah ah c'était donc toi le petit mâlin qui essayais de faire crasher mon bot mais maintenant je te tient ! :joy:").then(`La commande info-serv a été exécuté par ${message.author.tag} de l'id : ${message.author}`);

    const user = message.mentions.users.first() || message.author;

    const formateedate = function(date) {
      return new Intl.DateTimeFormat("fr").format(date);
    };
    message.guild.members.fetch(user.id).then(utilisateur => {
      const arejointle = formateedate(utilisateur.joinedAt);

      const avatarutilisateur = user.displayAvatarURL();
      const nommention = user.username;
      const discriminateur = `#${user.discriminator}`;
      const idmention = user.id;
      const statutdelapersonne = user.presence.status;
      const inscription = message.guild.members.cache.get(user.id).user.createdAt;

      const embed = new MessageEmbed()
        .setColor("#ff00dc")
        .addField("**Information sur :**", nommention)
        .setThumbnail(avatarutilisateur)
        .addField("Vous avez rejoint le :", arejointle, true)
        .addField(`Id de : ${nommention}`, idmention, true)
        .setFooter(`Demandé par ${message.author.username}`)
        .setTimestamp();
      message
        .channel.send(embed)
        .then(console.log(`La commande info-serv a été exécuté par ${message.author.tag} de l'id : ${message.author}`));
    });
  }
}
module.exports = infoutilisateurcommands;
