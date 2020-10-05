const { Command } = require("discord-akairo");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

class embrassercommands extends Command {
  constructor() {
    super("embrasse", {
      aliases: ["embrasse"],
      split: "sticky",
      args: [
        {
          id: "argument",
          match: "content"
        }
      ]
    });
  }

  async exec(message, args) {
    if (message.channel.type === "dm")
      return message.reply(
        "Ca alors tu veux m'embrasser non c'est pas poissible je ne suis que un robot ça veux dire que tu veux t'embrasser toi ce qui est encore plus bizarre, commande certifié et validé non exécutable en MP ! :joy:"
      );
    const nonmention = args.argument;
    if (!nonmention)
      return message.channel.send(
        "merci de mentionner une personne \n Exemple : `m*embrasse @(la personne sans les parenthèses !)`"
      );

    const user = message.mentions.users.first().username;
    const embrasse = await fetch("https://nekos.life/api/v2/img/kiss")
      .then(res => res.json())
      .then(json => json.url);

    const embed = new MessageEmbed()
      .setImage(embrasse)
      .setDescription(`[L'image ne s'affiche pas clique ici !](${embrasse})`)
      .setFooter(`Demandé par ${message.author.username}`)
      .setTitle(`${message.author.username} embrasse ${user}`)
      .setTimestamp();
    message.channel
      .send(embed)
      .then(
        console.log(
          `La commande embrasse a été exécuté par ${message.author.tag} de l'id : ${message.author}`
        )
      );
  }
}
module.exports = embrassercommands;
