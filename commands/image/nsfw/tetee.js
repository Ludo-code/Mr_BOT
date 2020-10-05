const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
  if (message.channel.type === "dm") return message.reply("Oh des tétons de type féminin, c'est beau mais mes MP ne les acceptent pas j'en suis navré (je te maudit mon maître) ! :joy:");
  message
    .delete({ timeout: 3000 })
    .then(console.log(`La commande tetons a été exécuté par ${message.author.tag} de l'id : ${message.author}`));
  if (!message.channel.nsfw) return message.channel.send(`Désolé ${message.author} mais tu ne peux faire cette commande que dans un salon nsfw !`);
  const tetee = await fetch("https://nekos.life/api/v2/img/tits")
    .then(res => res.json())
    .then(json => json.url);

  const embed = new MessageEmbed()
    .setTitle("L'image ne s'affiche pas clique ici !").setURL(`${tetee}`)
    .setImage(tetee)
    .setFooter(`Demandé par ${message.author.username}`)
    .setTimestamp();
  message.channel.send(embed);
};
