const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
  if (message.channel.type === "dm") return message.reply("Fétichiste OK, mais fétichiste des pieds bah je suis toujours ok en faite sauf pour que tu fasse cette commande en MP ! :joy:");
  message
    .delete({ timeout: 3000 })
    .then(console.log(`La commande pied_gif a été exécuté par ${message.author.tag} de l'id : ${message.author}`));
  if (!message.channel.nsfw) return message.channel.send(`Désolé ${message.author} mais tu ne peux faire cette commande que dans un salon nsfw !`);
  const feetgif = await fetch("https://nekos.life/api/v2/img/feetg")
    .then(res => res.json())
    .then(json => json.url);

  const embed = new MessageEmbed()
    .setTitle("L'image ne s'affiche pas clique ici !").setURL(`${feetgif}`)
    .setImage(feetgif)
    .setFooter(`Demandé par ${message.author.username}`)
    .setTimestamp();
  message.channel.send(embed);
};
