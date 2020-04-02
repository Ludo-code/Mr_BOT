const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = async (client, message, args) => {
  if (message.channel.type === "dm") return message.reply("Juste une tapotte pffff dommage que mon maître ne me laisse pas exécuter cette commande en MP ! :joy:");
  const user =
    message.mentions.users.first() || message.guild.members.get(args[0]);
  message
    .delete({ timeout: 3000 })
    .then(console.log("Un message a été supprimé !"));
  const embrasse = await fetch("https://neko-love.xyz/api/v1/pat")
    .then(res => res.json())
    .then(json => json.url);

  const embed = new MessageEmbed()
    .setImage(embrasse)
    .setFooter(`Demandé par ${message.author.username}`)
    .setTitle(`${message.author.tag} fait une petite tappe a ${user.tag}`);
  message.channel.send(embed);
};
