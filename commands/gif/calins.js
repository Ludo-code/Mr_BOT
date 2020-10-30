const { Command } = require("discord-akairo");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

class calincommands extends Command {
  constructor() {
    super("calin", {
      aliases: ["calin", "câlin"],
      split: "sticky"
    });
  }

  async exec(message) {
    if (message.channel.type === "dm")
      return message.reply(
        "Oh tu veux faireun câlin c'est trop mignon mais juste a toi même tu dois vraiment être narcissique heuresement que la commande est non disponible en MP ! :joy:"
      );
      
      function userfunction() {
        let user;
        if (message.mentions.users.first()) {
          user =  message.mentions.users.first().username;
        } else {
          user = " "
        }
        return user;
      }

    const calin = await fetch("https://nekos.life/api/v2/img/hug")
      .then(res => res.json())
      .then(json => json.url);

    const embed = new MessageEmbed()
      .setImage(calin)
      .setDescription(`[L'image ne s'affiche pas clique ici !](${calin})`)
      .setFooter(`Demandé par ${message.author.username}`)
      .setTitle(`${message.author.username} câline ${userfunction()}`)
      .setTimestamp();
    message.channel
      .send(embed)
      .then(
        console.log(
          `La commande câlin a été exécuté par ${message.author.tag} de l'id : ${message.author}`
        )
      );
  }
}
module.exports = calincommands;
