const fetch = require("node-fetch");
const { RichEmbed } = require("discord.js");

module.exports = async (client, message) => {
  message
    .delete({ timeout: 3000 })
    .then(console.log("Un message a été supprimé !"));
  const chat = await fetch("http://aws.random.cat/meow")
    .then(res => res.json())
    .then(json => json.file);

  const embed = new RichEmbed().setImage(chat);
  message.channel.send(embed);
};
