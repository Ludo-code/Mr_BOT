const { Command } = require("discord-akairo");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

class yuricommands extends Command {
  constructor() {
    super("yuri", {
      aliases: ["yuri"],
      split: "sticky",
      clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    });
  }

  async exec(message) {
    if (message.channel.type === "dm")
      return message.reply(
        "Oh du yuri Monsieur ou madame est connaisseur/connaisseuse mais désolé a toi la commande ne peux pas être exécuté en MP ! :joy:"
      );
    if (!message.channel.nsfw)
      return message.channel.send(
        `Désolé ${message.author} mais tu ne peux faire cette commande que dans un salon nsfw !`
      );

    const yuri = await fetch("https://nekos.life/api/v2/img/yuri")
      .then((res) => res.json())
      .then((json) => json.url);

    const embed = new MessageEmbed()
      .setTitle("L'image ne s'affiche pas clique ici !")
      .setURL(`${yuri}`)
      .setImage(yuri)
      .setFooter(`Demandé par ${message.author.username}`)
      .setTimestamp();
    message.channel
      .send(embed)
      .then(
        console.log(
          `La commande yuri a été exécuté par ${message.author.tag} de l'id : ${message.author}`
        )
      );
  }
}
module.exports = yuricommands;
