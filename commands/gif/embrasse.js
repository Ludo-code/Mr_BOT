const fetch = require("node-fetch");
const { RichEmbed } = require("discord.js");

module.exports = async (client, message, args) => {
  const user =
    message.mentions.users.first() || message.guild.members.get(args[0]);
  message
    .delete({ timeout: 3000 })
    .then(console.log("Un message a été supprimé !"));
  const embrasse = await fetch("https://neko-love.xyz/api/v1/kiss")
    .then(res => res.json())
    .then(json => json.url);

  const embed = new RichEmbed()
    .setImage(embrasse)
    .setFooter(`Demandé par ${message.author.username}`)
    .setTitle(`${message.author.tag} embrasse ${user.tag}`);
  message.channel.send(embed);
};
