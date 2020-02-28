const fetch = require("node-fetch");
const { RichEmbed } = require("discord.js");

module.exports = async (client, message, args) => {
  if (message.channel.type === "dm") return message.reply("Alors on essaye de se cacher ! :joy:");
  const user =
    message.mentions.users.first() || message.guild.members.get(args[0]);
  message
    .delete({ timeout: 3000 })
    .then(console.log("Un message a été supprimé !"));
  const embrasse = await fetch("https://nekos.life/api/v2/img/hug")
    .then(res => res.json())
    .then(json => json.url);

  const embed = new RichEmbed()
    .setTitle(`${message.author.tag} câline ${user.tag}`)
    .setImage(embrasse)
    .setFooter(`Demandé par ${message.author.username}`);
  message.channel.send(embed);
};
