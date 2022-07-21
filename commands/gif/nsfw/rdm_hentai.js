const { Command } = require("sheweny");
const fetch = import("node-fetch");
const { MessageEmbed } = require("discord.js");

class rdmhentaicommands extends Command {
  constructor(client) {
    super(client, {
      name: "hentai_gif",
      description: "Permet d'envoyer un gif hentai aléatoire",
      aliases: ["hentai_gif"],
      split: "sticky",
      userPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
      category: "nsfw",
    });
  }

  async exec(message) {
    if (message.channel.type === "dm")
      return message.reply(
        "Oh du hentai mais en MP je suis pas d'accord ! :joy:"
      );
    if (!message.channel.nsfw)
      return message.channel.send(
        `Désolé ${message.author} mais tu ne peux faire cette commande que dans un salon nsfw !`
      );

    const rdmhentaigif = await fetch(
      "https://nekos.life/api/v2/img/Random_hentai_gif"
    )
      .then((res) => res.json())
      .then((json) => json.url);

    const embed = new MessageEmbed()
      .setTitle("L'image ne s'affiche pas clique ici !")
      .setURL(`${rdmhentaigif}`)
      .setImage(rdmhentaigif)
      .setFooter(`Demandé par ${message.author.username}`)
      .setTimestamp();
    message.channel
      .send(embed)
      .then(
        console.log(
          `La commande hentai_gif a été exécuté par ${message.author.tag} de l'id : ${message.author}`
        )
      );
  }
}
module.exports = rdmhentaicommands;
