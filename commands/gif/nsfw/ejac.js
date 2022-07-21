const { Command } = require("sheweny");
const fetch = import("node-fetch");
const { MessageEmbed } = require("discord.js");

class ejaccommands extends Command {
  constructor(client) {
    super(client, {
      name: "ejac",
      description: "Permet d'éjaculer sur une personne",
      aliases: ["ejac"],
      split: "sticky",
      args: [
        {
          id: "argument",
          match: "content",
        },
      ],
      userPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
      category: "nsfw",
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
        "merci de mentionner une personne \n Exemple : `m*ejac @(la personne sans les parenthèses !)`"
      );

    const user = message.mentions.users.first().username;
    if (!message.channel.nsfw)
      return message.channel.send(
        `Désolé ${message.author} mais tu ne peux faire cette commande que dans un salon nsfw !`
      );
    const ejac = await fetch("https://nekos.life/api/v2/img/cum")
      .then((res) => res.json())
      .then((json) => json.url);

    const embed = new MessageEmbed()
      .setImage(ejac)
      .setDescription(`[L'image ne s'affiche pas clique ici !](${ejac})`)
      .setFooter(`Demandé par ${message.author.username}`)
      .setTitle(`${message.author.username} éjacule sur ${user}`)
      .setTimestamp();
    message.channel
      .send(embed)
      .then(
        console.log(
          `La commande ejac a été exécuté par ${message.author.tag} de l'id : ${message.author}`
        )
      );
  }
}
module.exports = ejaccommands;
