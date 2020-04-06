const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = async (client, message, args) => {
  if (message.channel.type === "dm") return message.reply("Ca alors tu veux m'embrasser non c'est pas poissible je ne suis que un robot ça veux dire que tu veux t'embrasser toi ce qui est encore plus bizarre, commande certifié et validé non exécutable en MP ! :joy:");
  const user =
    message.mentions.users.first() || message.guild.members.get(args[0]);
  message
    .delete({ timeout: 3000 })
    .then(
      console.log(
        `La commande embrasse a été exécuté par ${message.author.tag} de l'id : ${message.author}`
      )
    );
  const embrasse = await fetch("https://neko-love.xyz/api/v1/kiss")
    .then(res => res.json())
    .then(json => json.url);

  const embed = new MessageEmbed()
    .setImage(embrasse)
    .setFooter(`Demandé par ${message.author.username}`)
    .setTitle(`${message.author.tag} embrasse ${user.tag}`)
    .setDescription(`[L'image ne s'affiche pas clique ici !](${embrasse})`)
    .setTimestamp();
  message.channel.send(embed);
};
