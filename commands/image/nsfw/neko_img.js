const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
  if (message.channel.type === "dm") return message.reply("Alors la de mieux en mieux je sais que les neko sont minion mais de la a les voir nu oulah attention a la zoophilie mais ça ne t'authorise touours pas a faire la commande en MP ! :joy:");
  message
    .delete({ timeout: 3000 })
    .then(console.log(`La commande nekonue a été exécuté par ${message.author.tag} de l'id : ${message.author}`));
  if (!message.channel.nsfw) return message.channel.send(`Désolé ${message.author} mais tu ne peux faire cette commande que dans un salon nsfw !`);
  const neko = await fetch("https://neko-love.xyz/api/v1/nekolewd")
    .then(res => res.json())
    .then(json => json.url);

  const embed = new MessageEmbed()
    .setTitle("L'image ne s'affiche pas clique ici !").setURL(`${neko}`)
    .setImage(neko)
    .setFooter(`Demandé par ${message.author.username}`)
    .setTimestamp();
  message.channel.send(embed);
};
