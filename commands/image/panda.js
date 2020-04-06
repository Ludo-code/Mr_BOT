const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
  if (message.channel.type === "dm") return message.reply("Le panda si belle animal mais mon maitre a aussi bloqué cette commande dans les MP c'est vraiment bizarre ! :joy:");
  message
    .delete({ timeout: 3000 })
    .then(
      console.log(
        `La commande panda a été exécuté par ${message.author.tag} de l'id : ${message.author}`
      )
    );
  const panda = await fetch("https://some-random-api.ml/img/panda")
    .then(res => res.json())
    .then(json => json.link);

  const embed = new MessageEmbed()
    .setTitle("L'image ne s'affiche pas clique ici !").setURL(`${panda}`)
    .setImage(panda)
    .setFooter(`Demandé par ${message.author.username}`)
    .setTimestamp();
  message.channel.send(embed);
};
