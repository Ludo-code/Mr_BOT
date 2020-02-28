const fetch = require("node-fetch");
const { RichEmbed } = require("discord.js");

module.exports = async (client, message) => {
  if (message.channel.type === "dm") return message.reply("Alors on essaye de se cacher ! :joy:");
  message
    .delete({ timeout: 3000 })
    .then(console.log("Un message a été supprimé !"));
  const meme = await fetch("https://meme-api.herokuapp.com/gimme")
    .then(res => res.json())
    .then(json => json.url);

  const embed = new RichEmbed()
    .setImage(meme)
    .setFooter(`Demandé par ${message.author.username}`);
  message.channel.send(embed);
};
