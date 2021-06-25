const { Command } = require("discord-akairo");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

class chattegcommands extends Command {
  constructor() {
    super("chatte_gif", {
      aliases: ["chatteg", "chatte_gif"],
      split: "sticky",
      clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
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
    const chatte = await fetch("https://nekos.life/api/v2/img/pussy")
      .then((res) => res.json())
      .then((json) => json.url);

    const embed = new MessageEmbed()
      .setTitle("L'image ne s'affiche pas clique ici !")
      .setURL(`${chatte}`)
      .setImage(chatte)
      .setFooter(`Demandé par ${message.author.username}`)
      .setTimestamp();
    message.channel
      .send(embed)
      .then(
        console.log(
          `La commande chatte_gif a été exécuté par ${message.author.tag} de l'id : ${message.author}`
        )
      );
  }
}
module.exports = chattegcommands;
