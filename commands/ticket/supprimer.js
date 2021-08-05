const { Command } = require("discord-akairo");

class suppticketcommands extends Command {
  constructor() {
    super("fermer", {
      aliases: ["fermer"],
      split: "sticky",
      clientPermissions: ["SEND_MESSAGES", "MANAGE_CHANNELS", "VIEW_CHANNEL"],
    });
  }

  async exec(message) {
    const client = this.client;
    if (message.channel.type === "dm")
      return message.reply("Supprimer un ticket en DM est inutile !");

    if (!message.channel.name.includes("ticket-"))
      return message.channel.send(
        "Désolé tu ne peux pas utiliser cette commande ici."
      );
    if (message.mentions.users.first()) {
      const utilisateurid = message.mentions.users.first();
      const utilisateurid2 = utilisateurid.id;
      if (
        !client.ticketsystem.get(
          `id-de-guild-${message.guild.id}-id-de-utilisateur-${utilisateurid2}`
        )
      ) {
        message.channel.send("Auncun utilisateur trouvé !");
        return;
      } else {
        message.channel.send("Le ticket seras fermer dans quelque seconde.");
        setTimeout(function () {
          message.channel.delete();
          client.ticketsystem.delete(
            `id-de-guild-${message.guild.id}-id-de-utilisateur-${utilisateurid2}`
          );
        }, 5000);
      }
    } else {
      message.channel.send("Tu n'as mentionné personne.");
    }
  }
}
module.exports = suppticketcommands;
