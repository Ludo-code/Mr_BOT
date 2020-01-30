const fetch = require("node-fetch");
const { RichEmbed } = require("discord.js");

module.exports = async (client, message) => {
  message
    .delete({ timeout: 3000 })
    .then(console.log("Un message a été supprimé !"));
  const meme = await fetch("https://some-random-api.ml/img/panda")
    .then(res => res.json())
    .then(json => json.link);

  const embed = new RichEmbed()
    .setImage(meme)
    .setFooter(`Demandé par ${message.author.username}`);
  message.channel.send(embed);
};
