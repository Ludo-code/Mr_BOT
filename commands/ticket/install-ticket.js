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
  }
}
module.exports = installticketcommands;
