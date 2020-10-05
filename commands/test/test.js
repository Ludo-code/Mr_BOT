const { Command } = require("discord-akairo");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

class testcommands extends Command {
  constructor() {
    super("test", {
      aliases: ["test"],
      split: "sticky",
      args: [
        {
          id: "argument",
          match: "content"
        }
      ]
    });
  }

  async exec(message, args) {
    if (message.channel.type === "dm") return message.reply("Il va falloir que tu m'explique comment tu fais pour éjaculer sur une personne dans les MP a moins que tu t' éjcule sur toi même ! :joy:");
    const contenuemessage = args.argument;
    
    if (!message.channel.nsfw) return message.channel.send(`Désolé ${message.author} mais tu ne peux faire cette commande que dans un salon nsfw !`);
    if (!contenuemessage)
      return message.channel.send("merci de mentionner une personne \n Exemple : `m* @(la personne sans les parenthèses !)`");


    const ejac = await fetch("https://nekos.life/api/v2/img/cum")
      .then(res => res.json())
      .then(json => json.url);

    // eslint-disable-next-line no-negated-condition
    if (!message.mentions.users.first()) {
      const embed1 = new MessageEmbed()
        .setImage(ejac)
        .setDescription(`[L'image ne s'affiche pas clique ici !](${ejac})`)
        .setFooter(`Demandé par ${message.author.username}`)
        .setTitle(`${message.author.username} éjacule ${contenuemessage}`)
        .setTimestamp();
      message.channel.send(embed1).then(console.log(`La commande ejac a été exécuté par ${message.author.tag} de l'id : ${message.author}`));
    } else {
      const contenuemessageavecmentionenusername = message.mentions.users.first().username;
      const regex = /^(<@!?\d+>)/g;
      const found = contenuemessage.match(regex);
      console.log(found);
      const embed2 = new MessageEmbed()
        .setImage(ejac)
        .setDescription(`[L'image ne s'affiche pas clique ici !](${ejac})`)
        .setFooter(`Demandé par ${message.author.username}`)
        .setTitle(`${message.author.username} éjacule ${contenuemessageavecmentionenusername}`)
        .setTimestamp();
      message.channel.send(embed2).then(console.log(`La commande ejac a été exécuté par ${message.author.tag} de l'id : ${message.author}`));
    }
    
  }
}
module.exports = testcommands;
