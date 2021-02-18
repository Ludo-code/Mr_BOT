const { Command } = require("discord-akairo");

class removeuserdbcommands extends Command {
  constructor() {
    super("retirer", {
      aliases: ["retirer",],
      split: "sticky"
    });
  }

  async exec(message) {
    const client = this.client;
    const member = message.member;


    if (message.channel.type === "dm")
      return message.reply(
        "Les tickets en DM sont inutile !"
      );

      if (!member.hasPermission("ADMINISTRATOR")) {
        message.channel.send(`${message.author}, désolé mais tu n'as pas les permissions requise.`); return;
      }


      if (message.mentions.users.first()) {
        const utilisateurid = message.mentions.users.first()
        const utilisateurid2 = utilisateurid.id
        if (!client.ticketsystem.get(`id-de-guild-${message.guild.id}-id-de-utilisateur-${utilisateurid2}`)) {
          message.channel.send("Auncun utilisateur trouvé !")
          return;
        } else {
          client.ticketsystem.delete(`id-de-guild-${message.guild.id}-id-de-utilisateur-${utilisateurid2}`)
          message.channel.send("Utilisateur supprimé !")
        }
        
      } else {
        message.channel.send("Tu n'as mentionné personne.")
      }


  }
}
module.exports = removeuserdbcommands;
