const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
  if (message.channel.type === "dm") return message.reply("Il va falloir que tu m'explique comment tu fais pour éjaculer sur personne dans les MP a moins que tu te fasse une faciale pour toi ! :joy:");
  const user = message.mentions.users.first().username;
  message
    .delete({ timeout: 3000 })
    .then(console.log(`La commande ejac a été exécuté par ${message.author.tag} de l'id : ${message.author}`));
  if (!message.channel.nsfw) return message.channel.send(`Désolé ${message.author} mais tu ne peux faire cette commande que dans un salon nsfw !`);
  const ejac = await fetch("https://nekos.life/api/v2/img/cum")
    .then(res => res.json())
    .then(json => json.url);

  const embed = new MessageEmbed()
    .setTitle("L'image ne s'affiche pas clique ici !").setURL(`${ejac}`)
    .setImage(ejac)
    .setFooter(`Demandé par ${message.author.username}`)
    .setTitle(`${message.author.username} éjacule sur ${user}`)
    .setTimestamp();
  message.channel.send(embed);
};
