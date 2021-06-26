const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const { Command } = require("discord-akairo");

class pleurecommands extends Command {
  constructor() {
    super("pleure", {
      aliases: ["pleure"],
      split: "sticky",
      clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    });
  }

  async exec(message) {
    if (message.channel.type === "dm")
      return message.reply(
        "Mais pourquoi pleurer seul tu as des amies. Donc elle resteras bloqué dans les MP ! :joy:"
      );

    const pleure = await fetch("https://neko-love.xyz/api/v1/cry")
      .then((res) => res.json())
      .then((json) => json.url);

    const embed = new MessageEmbed()
      .setTitle("L'image ne s'affiche pas clique ici !")
      .setURL(`${pleure}`)
      .setImage(pleure)
      .setFooter(`Demandé par ${message.author.username}`)
      .setTimestamp();
    message.channel
      .send(embed)
      .then(
        console.log(
          `La commande pleure a été exécuté par ${message.author.tag} de l'id : ${message.author}`
        )
      );
  }
}
module.exports = pleurecommands;
