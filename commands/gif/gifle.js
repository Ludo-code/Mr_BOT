const fetch = require("node-fetch");
const { RichEmbed } = require("discord.js");

module.exports = async (client, message, args) => {
  if (message.channel.type === "dm") return message.reply("Une gifle, une gifle mais qui la mérite c'est impossible que ce soit moi donc c'est toi mais ça veux dire que tu est masochiste brrrr j'en ai des frisson pas de ça dans mes MP merci! :joy:");
  const user =
    message.mentions.users.first() || message.guild.members.get(args[0]);
  message
    .delete({ timeout: 3000 })
    .then(console.log("Un message a été supprimé !"));
  const embrasse = await fetch("https://neko-love.xyz/api/v1/slap")
    .then(res => res.json())
    .then(json => json.url);

  const embed = new RichEmbed()
    .setImage(embrasse)
    .setFooter(`Demandé par ${message.author.username}`)
    .setTitle(`${message.author.tag} gifle ${user.tag}`);
  message.channel.send(embed);
};
