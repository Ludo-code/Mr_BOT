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
        let nickornot;
        if (message.mentions.users.first()) {
          const user =  message.mentions.users.first();
          const utilisateurnickname = message.guild.members.cache.get(user.id).nickname;
          nickornot = utilisateurnickname || message.mentions.users.first().username;
        } else {
          nickornot = " "
        }
        return nickornot;
      }
      const userauthor =  message.author;
      const utilisateurnickname2 = message.guild.members.cache.get(userauthor.id).nickname;
      const nickornot2 = utilisateurnickname2 || message.author.nickname;

    const calin = await fetch("https://nekos.life/api/v2/img/hug")
      .then(res => res.json())
      .then(json => json.url);

    const embed = new MessageEmbed()
      .setImage(calin)
      .setDescription(`[L'image ne s'affiche pas clique ici !](${calin})`)
      .setFooter(`Demandé par ${message.author.username}`)
      .setTitle(`${nickornot2} câline ${userfunction()}`)
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
