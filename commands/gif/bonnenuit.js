const { Command } = require("discord-akairo");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const { apikey } = require("../../config.js")

class bonnenuitcommands extends Command {
  constructor() {
    super("Bonne Nuit", {
      aliases: ["bonne_nuit"],
      split: "sticky",
      args: [
        {
          id: "contenumessage",
          match: "content"
        }
      ],
      clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"]
    });
  }

  async exec(message, args) {

    if (message.channel.type === "dm")
      return message.reply(
        "Désolé tu ne purras pas te dire bonne nuit a toi même ou bien même à moi :wink:"
      );

      const lmt = 50;
      const search = "good night"

      const msgcontent = args.contenumessage;

      function userfunction() {
        let nickornot;
        if (message.mentions.users.first()) {
          const user =  message.mentions.users.first();
          const utilisateurnickname = message.guild.members.cache.get(user.id).nickname;
          nickornot = utilisateurnickname || message.mentions.users.first().username;
        } else if (!msgcontent) {
          nickornot = "tous le monde";
        } else {
          nickornot = msgcontent;
        }
        return nickornot;
      }
      const userauthor =  message.author;
      const utilisateurnickname2 = message.guild.members.cache.get(userauthor.id).nickname;
      const nickornot2 = utilisateurnickname2 || userauthor.username;

      const bonnenuit = await fetch(`https://api.tenor.com/v1/random?key=${apikey}&q=${search}&limit=${lmt}`)
      .then(res => res.json())
      .then(json => json.results[0].media[0].gif.url)


    const embed = new MessageEmbed()
      .setImage(bonnenuit)
      .setDescription(`[L'image ne s'affiche pas clique ici !](${bonnenuit})`)
      .setFooter(`Demandé par ${message.author.username}`)
      .setTitle(`${nickornot2} dis bonne nuit à ${userfunction()}`)
      .setTimestamp();
    await message.channel.send(embed);

  }
}
module.exports = bonnenuitcommands;
