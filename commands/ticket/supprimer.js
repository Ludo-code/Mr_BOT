const { Command } = require("discord-akairo");

class suppticketcommands extends Command {
  constructor() {
    super("fermer", {
      aliases: ["fermer",],
      split: "sticky"
    });
  }

  async exec(message) {
      const client = this.client
    if (message.channel.type === "dm")
      return message.reply(
        "Supprimer un ticket en DM est inutile !"
      );
            
      if(!message.channel.name.includes("ticket-")) return message.channel.send("Désolé tu ne peux pas utiliser cette commande ici.")
      if (message.mentions.users.first()) {
        const utilisateurid = message.mentions.users.first()
        const utilisateurid2 = utilisateurid.id
        if (!client.ticketsystem.get(`id-de-guild-${message.guild.id}-id-de-utilisateur-${utilisateurid2}`)) {
          message.channel.send("Auncun utilisateur trouvé !")
          return;
        } else {
          client.ticketsystem.delete(`id-de-guild-${message.guild.id}-id-de-utilisateur-${utilisateurid2}`)
          message.channel.delete();
          message.channel.send("Le ticket a bien été fermée !")
        }
        
      } else {
        message.channel.send("Tu n'as mentionné personne.")
      }
  }
}
module.exports = suppticketcommands;
