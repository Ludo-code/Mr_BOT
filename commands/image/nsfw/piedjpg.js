const { Command } = require("discord-akairo");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

class piedjpgcommands extends Command {
  constructor() {
    super("pied", {
      aliases: ["pied"],
      split: "sticky",
      clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    });
  }

  async exec(message) {
    if (message.channel.type === "dm")
      return message.reply(
        "Alors après les pieds en gif les voila maintenant en image on arrête donc pas un fétichiste ! :joy:"
      );
    if (!message.channel.nsfw)
      return message.channel.send(
        `Désolé ${message.author} mais tu ne peux faire cette commande que dans un salon nsfw !`
      );

    const pied = await fetch("https://nekos.life/api/v2/img/erofeet")
      .then((res) => res.json())
      .then((json) => json.url);

    const embed = new MessageEmbed()
      .setTitle("L'image ne s'affiche pas clique ici !")
      .setURL(`${pied}`)
      .setImage(pied)
      .setFooter(`Demandé par ${message.author.username}`)
      .setTimestamp();
    message.channel
      .send(embed)
      .then(
        console.log(
          `La commande pied a été exécuté par ${message.author.tag} de l'id : ${message.author}`
        )
      );
  }
}
module.exports = piedjpgcommands;
