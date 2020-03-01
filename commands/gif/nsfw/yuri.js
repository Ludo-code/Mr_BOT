const fetch = require("node-fetch");
const { RichEmbed } = require("discord.js");

module.exports = async (client, message) => {
  if (message.channel.type === "dm") return message.reply("Oh du yuri Monsieur ou madame est connaisseur/connaisseuse mais désolé a toi la commande ne peux pas être exécuté en MP ! :joy:");
  message
    .delete({ timeout: 3000 })
    .then(console.log(`La commande yuri a été exécuté par ${message.author.username} de l'id : ${message.author}`));
  if (!message.channel.nsfw) return message.channel.send(`Désolé ${message.author} mais tu ne peux faire cette commande que dans un salon nsfw !`);
  const neko = await fetch("https://nekos.life/api/v2/img/yuri")
    .then(res => res.json())
    .then(json => json.url);

  const embed = new RichEmbed()
    .setImage(neko)
    .setFooter(`Demandé par ${message.author.username}`);
  message.channel.send(embed);
};
