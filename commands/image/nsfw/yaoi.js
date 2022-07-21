const { Command } = require("sheweny");
const { MessageEmbed } = require("discord.js");
const booru = require("booru");

class yaoicommands extends Command {
  constructor(client) {
    super(client, {
      name: "yaoi",
      description: "Permet d'envoyer une image de yaoi aléatoire",
      aliases: ["yaoi"],
      split: "sticky",
      userPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
      category: "nsfw",
    });
  }

  async exec(message) {
    if (message.channel.type === "dm")
      return message.reply(
        "Alors on essaye de se cacher pour se masturber oh le vilain ! :joy:"
      );
    if (!message.channel.nsfw)
      return message.channel.send(
        `Désolé ${message.author} mais tu ne peux faire cette commande que dans un salon nsfw !`
      );
    if (
      message.content.toUpperCase().includes("LOLI") ||
      message.content.toUpperCase().includes("GORE")
    )
      return message.channel.send(
        "Ce genre de chose n'est pas autorisé même dans un salon nsfw"
      );
    const query = "yaoi";
    booru
      .search("gelbooru", [query], { nsfw: true, limit: 1, random: true })
      .then(booru)
      .then((images) => {
        for (const image of images) {
          const embed = new MessageEmbed()
            .setTitle("L'image ne s'affiche pas clique ici !")
            .setURL(image.file_url)
            .setImage(image.file_url)
            .setFooter(`Demandé par ${message.author.username}`)
            .setTimestamp();
          message.channel
            .send(embed)
            .then(
              console.log(
                `La commande yaoi a été exécuté par ${message.author.tag} de l'id : ${message.author}`
              )
            );
        }
      })
      .catch((err) => {
        if (err.name === "booruError") {
          message.channel.send(`Aucun résultat trouvé pour : **${query}**`);
        } else {
          message.channel.send(`Aucun résultat trouvé pour : **${query}**`);
        }
      });
  }
}
module.exports = yaoicommands;
