const { Command } = require("sheweny");
const fetch = import("node-fetch");
const { MessageEmbed } = require("discord.js");

class tapotecommands extends Command {
  constructor(client) {
    super(client, {
      name: "tapote",
      description: "Permet de faire une petite tapotte à une personne",
      aliases: ["tapote"],
      split: "sticky",
      args: [
        {
          id: "argument",
          match: "content",
        },
      ],
      userPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    });
  }

  async exec(message, args) {
    if (message.channel.type === "dm")
      return message.reply(
        "Juste une tapotte pffff dommage que mon maître ne me laisse pas exécuter cette commande en MP ! :joy:"
      );

    const nonmention = args.argument;
    if (!nonmention)
      return message.channel.send(
        "merci de mentionner une personne \n Exemple : `m*tapote @(la personne sans les parenthèses !)`"
      );

    const user = message.mentions.users.first().username;
    const tapote = await fetch("https://nekos.life/api/v2/img/pat")
      .then((res) => res.json())
      .then((json) => json.url);

    const embed = new MessageEmbed()
      .setImage(tapote)
      .setDescription(`[L'image ne s'affiche pas clique ici !](${tapote})`)
      .setFooter(`Demandé par ${message.author.username}`)
      .setTitle(`${message.author.username} fait une petite tape à ${user}`)
      .setTimestamp();
    message.channel
      .send(embed)
      .then(
        console.log(
          `La commande tapote a été exécuté par ${message.author.tag} de l'id : ${message.author}`
        )
      );
  }
}
module.exports = tapotecommands;
