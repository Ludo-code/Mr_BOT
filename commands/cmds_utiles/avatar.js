const { MessageEmbed } = require("discord.js");
const { Command } = require("sheweny");

class avatarcommands extends Command {
  constructor(client) {
    super(client, {
      name: "avatar",
      split: "sticky",
      aliases: ["avatar"],
      description: "Afficher l'avatar d'un utilisateur",
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

    message.guild.members.fetch(user.id).then((utilisateur) => {
      const avatarutilisateur = user.displayAvatarURL({
        format: "png",
        size: 1024,
      });

      const embed = new MessageEmbed()
        .setColor("#ff00dc")
        .setImage(avatarutilisateur)
        .setFooter(`Demandé par ${message.author.username}`)
        .setTimestamp();
      message.channel.send(embed);
    });
  }
}
module.exports = avatarcommands;
