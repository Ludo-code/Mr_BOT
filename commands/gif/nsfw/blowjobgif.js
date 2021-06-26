const { Command } = require("discord-akairo");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

class sucegifcommands extends Command {
  constructor() {
    super("suce", {
      aliases: ["suce"],
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
        "Il va falloir que tu m'explique comment tu fais pour éjaculer sur personne dans les MP a moins que tu te fasse une faciale pour toi ! :joy:"
      );

    const nonmention = args.argument;
    if (!nonmention)
      return message.channel.send(
        "merci de mentionner une personne \n Exemple : `m*suce @(la personne sans les parenthèses !)`"
      );

    const user = message.mentions.users.first().username;
    if (!message.channel.nsfw)
      return message.channel.send(
        `Désolé ${message.author} mais tu ne peux faire cette commande que dans un salon nsfw !`
      );
    const sucegif = await fetch("https://nekos.life/api/v2/img/bj")
      .then((res) => res.json())
      .then((json) => json.url);

    const embed = new MessageEmbed()
      .setImage(sucegif)
      .setDescription(`[L'image ne s'affiche pas clique ici !](${sucegif})`)
      .setFooter(`Demandé par ${message.author.username}`)
      .setTitle(`${message.author.username} suce ${user}`)
      .setTimestamp();
    message.channel
      .send(embed)
      .then(
        console.log(
          `La commande suce a été exécuté par ${message.author.tag} de l'id : ${message.author}`
        )
      );
  }
}
module.exports = sucegifcommands;
