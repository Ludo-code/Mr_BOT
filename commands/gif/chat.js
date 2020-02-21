const fetch = require("node-fetch");
const { RichEmbed } = require("discord.js");

module.exports = async (client, message) => {
  message
    .delete({ timeout: 3000 })
    .then(console.log("Un message a été supprimé !"))
    .then(message.channel.send(`Désolé a toi ${message.author} mais l'api que j'utilise est down donc pas de chat j'en suis désolé liens vers l'api : http://aws.random.cat/meow encore désolé pour le problème j'éspère qu'il seras vite réglé !!! `));
  const chat = await fetch("http://aws.random.cat/meow")
    .then(res => res.json())
    .then(json => json.file);

  const embed = new RichEmbed()
    .setImage(chat)
    .setFooter(`Demandé par ${message.author.username}`);
  message.channel.send(embed);
};
