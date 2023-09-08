import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, EmbedBuilder } from "discord.js";

export const command = {
    name: 'ticket-install',
    description: 'Installs ticket in the channel!',
    staffOnly: true,
    async execute(message, args) {
        try {
            let channel = message.mentions.channels.first() || message.channel;
            if (channel.type != ChannelType.GuildText) {
                return await message.reply(`Please provide a text channel.`);
            }

            let embed = new EmbedBuilder()
                .setTitle(`Ticket`)
                .setDescription(`Please click 🎫 button below to create a ticket.`);

            let row = new ActionRowBuilder()
                .setComponents(
                    new ButtonBuilder()
                        .setCustomId('ticketcreate')
                        .setEmoji('🎫')
                        .setLabel('Create Ticket')
                        .setStyle(ButtonStyle.Primary)
                );

            await channel.send({
                embeds: [embed],
                components: [row],
            });

            await message.reply(`Installed the Ticket embed in ${channel}`);
        } catch (error) {
            console.error(error);
            await message.reply(`Could not install the Ticket embed in ${channel}. Please check if I have permission to send message and embed links in that channel.`);
        }
    },
};