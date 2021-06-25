const { Listener } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

class messagereactionaddListener extends Listener {
  constructor() {
    super("messageReactionAdd", {
      emitter: "client",
      event: "messageReactionAdd",
    });
  }

  async exec(reaction, user) {
    const client = this.client;

    if (reaction.message.partial) {
      reaction.message.fetch();
    }

    if (
      reaction.message.id ===
      client.ticketsystem.get(`${reaction.message.guild.id}-id-message`)
    ) {
      if (user.partial) await user.fetch();
      if (reaction.partial) await reaction.fetch();
      if (reaction.message.partial) await reaction.message.fetch();

      if (user.bot) return;

      const utilisateur = user.id;
      const utilisateurid = client.ticketsystem.get(
        `id-de-guild-${reaction.message.guild.id}-id-de-utilisateur-${utilisateur}`
      );

      const utilisateursetid = client.ticketsystem.set(
        `id-de-guild-${reaction.message.guild.id}-id-de-utilisateur-${utilisateur}`,
        utilisateur
      );

      let ticketid = await client.ticketsystem.get(
        `${reaction.message.guild.id}-id-message`
      );

      if (!ticketid) return;

      if (reaction.message.id === ticketid && reaction.emoji.name == "🎫") {
        reaction.users.remove(user);

        if (utilisateur === utilisateurid) {
          reaction.users.remove(user);
          user.send("Tu as déjà un ticket ouvert.");
          return;
        }
        client.ticketsystem.set(
          `id-de-guild-${reaction.message.guild.id}-id-de-utilisateur-${utilisateur}`,
          utilisateur
        );

        reaction.message.guild.channels
          .create(`ticket-de-${user.username}`, {
            permissionOverwrites: [
              {
                id: user.id,
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
              },
              {
                id: reaction.message.guild.roles.everyone,
                deny: ["VIEW_CHANNEL"],
              },
            ],
            type: "text",
          })
          .then(async (channel) => {
            channel.send(
              `<@${user.id}>`,
              new MessageEmbed()
                .setTitle("Bienvenue sur votre ticket !")
                .setDescription(
                  "Un modérateur essayeras de vous répondre le plus rapidement possible."
                )
                .setColor("00ff00")
            );
          });
      }
    }
  }
}

module.exports = messagereactionaddListener;
