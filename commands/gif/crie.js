const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = async (client, message, args) => {
  if (message.channel.type === "dm") return message.reply("Mais tu crier sur qui pas sur moi quand même ce serait impolie mais si tu te crie sur toi ce serait encore plus bizarre donc elle resteras bloqué dans les MP ! :joy:");
  const user =
    message.mentions.users.first() || message.guild.members.get(args[0]);
  message
    .delete({ timeout: 3000 })
    .then(
      console.log(
        `La commande crie a été exécuté par ${message.author.tag} de l'id : ${message.author}`
      )
    );
  const embrasse = await fetch("https://neko-love.xyz/api/v1/cry")
    .then(res => res.json())
    .then(json => json.url);

  const embed = new MessageEmbed()
    .setImage(embrasse)
    .setFooter(`Demandé par ${message.author.username}`)
    .setTitle(`${message.author.tag} crie sur ${user.tag}`)
    .setTimestamp();
  message.channel.send(embed);
};
