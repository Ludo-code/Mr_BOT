const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

class pingcommands extends Command {
  constructor() {
    super("ping", {
      aliases: ["ping"],
      split: "sticky",
      clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    });
  }

  exec(message) {
    if (message.channel.type === "dm")
      return message.reply(
        "Un ping un ping non je ne t'authorise pas a l'exécuter en MP pour une fois je suis d'accord avec le patron ! :joy:"
      );
    const debut = Date.now();
    const embed = new MessageEmbed()
      .setColor("#ff00dc")
      .addField("**Temps entre l'api et le bot : **", "ms")
      .setFooter(`Demandé par ${message.author.username}`)
      .setTimestamp();
    message.channel.send(embed).then((m) => {
      const embedmodif = new MessageEmbed()
        .setColor("#ff00dc")
        .addField(
          "**Temps entre l'api et le bot : **",
          `:hourglass: **${Date.now() - debut}**ms`
        )
        .setFooter(`Demandé par ${message.author.username}`)
        .setTimestamp();
      m.edit(embedmodif);
    });
  }
}
module.exports = pingcommands;
