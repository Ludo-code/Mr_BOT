const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

class installticketcommands extends Command {
  constructor() {
    super("ticket-install", {
      aliases: ["ticket-install",],
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

      let channel = message.mentions.channels.first();
      if(!channel) return message.reply("Utilisation : `m*ticket-install #salon`");

      let sent = await channel.send(new MessageEmbed()
          .setTitle("Ticket pour le support !")
          .setDescription("Réagis afin de crée ton ticket !")
          .setFooter("Ticket support")
          .setColor("00ff00")
      );

      sent.react('🎫');
      client.ticketsystem.set(`${message.guild.id}-id-message`, sent.id);

      message.channel.send("Salon de ticket bien installer.");




      client.on('messageReactionAdd', async (reaction, user) => {
        if(user.partial) await user.fetch();
        if(reaction.partial) await reaction.fetch();
        if(reaction.message.partial) await reaction.message.fetch();
    
        if(user.bot) return;


        const utilisateur = user.id;
        const utilisateurid = client.ticketsystem.get(`id-de-guild-${message.guild.id}-id-de-utilisateur-${utilisateur}`);




        
        const utilisateursetid = client.ticketsystem.set(`id-de-guild-${message.guild.id}-id-de-utilisateur-${utilisateur}`, utilisateur);  
            
        let ticketid = await client.ticketsystem.get(`${reaction.message.guild.id}-id-message`);

        if(!ticketid) return;
    
        if(reaction.message.id === ticketid && reaction.emoji.name == '🎫') {
            reaction.users.remove(user);

            if(utilisateur === utilisateurid) {
              reaction.users.remove(user)
              user.send("Tu as déjà un ticket ouvert.")
              return;
          }
            client.ticketsystem.set(`id-de-guild-${message.guild.id}-id-de-utilisateur-${utilisateur}`, utilisateur);

    
            reaction.message.guild.channels.create(`ticket-de-${user.username}`, {
                permissionOverwrites: [
                    {
                        id: user.id,
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    },
                    {
                        id: reaction.message.guild.roles.everyone,
                        deny: ["VIEW_CHANNEL"]
                    }
                ],
                type: 'text'
            }).then(async channel => {
                channel.send(`<@${user.id}>`, new MessageEmbed().setTitle("Bienvenue sur votre ticket !").setDescription("Un modérateur essayeras de vous répondre le plus rapidement possible.").setColor("00ff00"))
            })
        }
      });
  }
}
module.exports = installticketcommands;
