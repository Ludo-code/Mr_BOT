const { Command } = require("sheweny");
const { MessageEmbed } = require("discord.js");
class direcommands extends Command {
  constructor(client) {
    super(client, {
      name: "dire",
      description: "Permet de dire quelque chose",
      aliases: ["dire", "dis"],
      split: "sticky",
      args: [
        {
          id: "contenutxt",
          match: "content",
        },
      ],
      userPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    });
  }
  exec(message, args) {
    if (message.channel.type === "dm")
      return message.reply("Interdit de répéter les message en mp ! :joy:");

    const msgcontent = args.contenutxt;
    if (!msgcontent)
      return message.channel.send(
        "Tu essaye de ne rien dire mais pourquoi :thinking: ?"
      );

    message.delete({});

    const userauthor = message.author;
    const utilisateurnickname2 = message.guild.members.cache.get(userauthor.id)
      .nickname;
    const nickornot2 = utilisateurnickname2 || userauthor.username;

    const embed = new MessageEmbed()
      .setColor("#ff00dc")
      .setAuthor(`${nickornot2} dis :`)
      .setDescription(`${msgcontent}`)
      .setFooter(`Demandé par ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);
  }
}
module.exports = direcommands;
