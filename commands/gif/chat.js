const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const { Command } = require("discord-akairo");

class chatcommands extends Command {
  constructor() {
    super("chat", {
      aliases: ["chat"],
      split: "sticky",
      clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"]
    });
  }

  async exec(message) {
    if (message.channel.type === "dm") return message.reply("Bon j'avoue tu veux un chat mais je suis désolé même cette commande je la bloque en MP ! :joy:");

    const chat = await fetch("http://aws.random.cat/meow")
      .then(res => res.json())
      .then(json => json.file);

    const embed = new MessageEmbed()
      .setTitle("L'image ne s'affiche pas clique ici !").setURL(`${chat}`)
      .setImage(chat)
      .setFooter(`Demandé par ${message.author.username}`)
      .setTimestamp();
    message.channel.send(embed).then(console.log(`La commande chat a été exécuté par ${message.author.tag} de l'id : ${message.author}`));
  }
}
module.exports = chatcommands;
