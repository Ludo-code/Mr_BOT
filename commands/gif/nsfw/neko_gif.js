const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
  if (message.channel.type === "dm") return message.reply("Oh un fan de neko après c'est vrai qu'ils sont minions avec leur petite oreille de chat mais tu n'as quand même pas le droit de le faire en MP ! :joy:");
  message
    .delete({ timeout: 3000 })
    .then(console.log(`La commande neko_gif a été exécuté par ${message.author.tag} de l'id : ${message.author}`));
  if (!message.channel.nsfw) return message.channel.send(`Désolé ${message.author} mais tu ne peux faire cette commande que dans un salon nsfw !`);
  const nekogif = await fetch("https://nekos.life/api/v2/img/nsfw_neko_gif")
    .then(res => res.json())
    .then(json => json.url);

  const embed = new MessageEmbed()
    .setTitle("L'image ne s'affiche pas clique ici !").setURL(`${nekogif}`)
    .setImage(nekogif)
    .setFooter(`Demandé par ${message.author.username}`)
    .setTimestamp();
  message.channel.send(embed);
};
