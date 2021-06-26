const { Command } = require("discord-akairo");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

class giflecommands extends Command {
  constructor() {
    super("gifle", {
      aliases: ["gifle"],
      split: "sticky",
      args: [
        {
          id: "argument",
          match: "content",
        },
      ],
      clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    });
  }

  async exec(message, args) {
    if (message.channel.type === "dm")
      return message.reply(
        "Une gifle, une gifle mais qui la mérite c'est impossible que ce soit moi donc c'est toi mais ça veux dire que tu est masochiste brrrr j'en ai des frisson pas de ça dans mes MP merci! :joy:"
      );

    const nonmention = args.argument;
    if (!nonmention)
      return message.channel.send(
        "merci de mentionner une personne \n Exemple : `m*gifle @(la personne sans les parenthèses !)`"
      );

    const user = message.mentions.users.first().username;
    const gifle = await fetch("https://nekos.life/api/v2/img/slap")
      .then((res) => res.json())
      .then((json) => json.url);

    const embed = new MessageEmbed()
      .setImage(gifle)
      .setDescription(`[L'image ne s'affiche pas clique ici !](${gifle})`)
      .setFooter(`Demandé par ${message.author.username}`)
      .setTitle(`${message.author.username} met une gifle à ${user}`)
      .setTimestamp();
    message.channel
      .send(embed)
      .then(
        console.log(
          `La commande gifle a été exécuté par ${message.author.tag} de l'id : ${message.author}`
        )
      );
  }
}
module.exports = giflecommands;
