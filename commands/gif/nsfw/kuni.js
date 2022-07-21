const { Command } = require("sheweny");
const fetch = import("node-fetch");
const { MessageEmbed } = require("discord.js");

class kunicommands extends Command {
  constructor(client) {
    super(client, {
      name: "cuni",
      description: "Permet d'envoyer une image de cuni aléatoire",
      aliases: ["cuni"],
      split: "sticky",
      userPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
      category: "nsfw",
    });
  }

  async exec(message) {
    if (message.channel.type === "dm")
      return message.reply(
        "Tient un fan de cuni qui n'assume pas et fais ça en MP allez t'inquiète pas je dirais rien ! :joy:"
      );

    if (!message.channel.nsfw)
      return message.channel.send(
        `Désolé ${message.author} mais tu ne peux faire cette commande que dans un salon nsfw !`
      );
    const kuni = await fetch("https://nekos.life/api/v2/img/kuni")
      .then((res) => res.json())
      .then((json) => json.url);

    const embed = new MessageEmbed()
      .setTitle("L'image ne s'affiche pas clique ici !")
      .setURL(`${kuni}`)
      .setImage(kuni)
      .setFooter(`Demandé par ${message.author.username}`)
      .setTimestamp();
    message.channel
      .send(embed)
      .then(
        console.log(
          `La commande cuni a été exécuté par ${message.author.tag} de l'id : ${message.author}`
        )
      );
  }
}
module.exports = kunicommands;
