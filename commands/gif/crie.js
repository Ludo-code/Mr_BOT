const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
  if (message.channel.type === "dm") return message.reply("Mais tu crier sur qui pas sur moi quand même ce serait impolie mais si tu te crie sur toi ce serait encore plus bizarre donc elle resteras bloqué dans les MP ! :joy:");
  const user = message.mentions.users.first().username;
  message
    .delete({ timeout: 3000 })
    .then(
      console.log(
        `La commande crie a été exécuté par ${message.author.tag} de l'id : ${message.author}`
      )
    );
  const crie = await fetch("https://neko-love.xyz/api/v1/cry")
    .then(res => res.json())
    .then(json => json.url);

  const embed = new MessageEmbed()
    .setImage(crie)
    .setFooter(`Demandé par ${message.author.username}`)
    .setTitle(`${message.author.username} crie sur ${user}`)
    .setDescription(`[L'image ne s'affiche pas clique ici !](${crie})`)
    .setTimestamp();
  message.channel.send(embed);
};
