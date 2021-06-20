const { Command } = require("discord-akairo");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

class nekonuecommands extends Command {
  constructor() {
    super("nekonue", {
      aliases: ["nekonue"],
      split: "sticky",
      clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"]
    });
  }

  async exec(message) {
  if (message.channel.type === "dm") return message.reply("Alors la de mieux en mieux je sais que les neko sont minion mais de la a les voir nu oulah attention a la zoophilie mais ça ne t'authorise touours pas a faire la commande en MP ! :joy:");
  if (!message.channel.nsfw) return message.channel.send(`Désolé ${message.author} mais tu ne peux faire cette commande que dans un salon nsfw !`);

    const nekonue = await fetch("https://nekos.life/api/v2/img/lewd")
      .then(res => res.json())
      .then(json => json.url);

    const embed = new MessageEmbed()
      .setTitle("L'image ne s'affiche pas clique ici !").setURL(`${nekonue}`)
      .setImage(nekonue)
      .setFooter(`Demandé par ${message.author.username}`)
      .setTimestamp();
    message.channel.send(embed).then(console.log(`La commande nekonue a été exécuté par ${message.author.tag} de l'id : ${message.author}`));
  }
}
module.exports = nekonuecommands;
