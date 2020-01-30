const fetch = require("node-fetch");
const { RichEmbed } = require("discord.js");

module.exports = async (client, message, args) => {
  const user =
    message.mentions.users.first() || message.guild.members.get(args[0]);
  message
    .delete({ timeout: 3000 })
    .then(console.log("Un message a été supprimé !"));
  const ejac = await fetch("https://nekos.life/api/v2/img/cum")
    .then(res => res.json())
    .then(json => json.url);

  const embed = new RichEmbed()
    .setImage(ejac)
    .setFooter(`Demandé par ${message.author.username}`)
    .setTitle(`${message.author.tag} éjacule sur ${user.tag}`);
  message.channel.send(embed);
};
