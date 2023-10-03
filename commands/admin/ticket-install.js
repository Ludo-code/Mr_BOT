import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, EmbedBuilder, PermissionsBitField } from "discord.js";

export const command = {
    name: 'ticket-install',
    description: 'Permet d\'envoyer le message de création de ticket',
    staffOnly: true,
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            let channel = message.mentions.channels.first() || message.channel;
            if (channel.type != ChannelType.GuildText) {
                return await message.reply(`Merci de donner le nom d'un salon...`);
            }

            let embed = new EmbedBuilder()
                .setTitle(`Ticket`)
                .setDescription(`Cliquez sur le bouton 🎫 pour vous créez un ticket.`);

            let row = new ActionRowBuilder()
                .setComponents(
                    new ButtonBuilder()
                        .setCustomId('ticketcreate')
                        .setEmoji('🎫')
                        .setLabel('Créer un ticket')
                        .setStyle(ButtonStyle.Primary)
                );

            await channel.send({
                embeds: [embed],
                components: [row],
            });

            await message.reply(`Le message de création de ticket à été mis avec succès dans ${channel}`);
        } catch (error) {
            console.error(error);
            await message.reply(`Impossible de mettre le message de création de ticket dans ${channel}. Merci de vérifier si le bot à les permissions d'envoyer un message et d'intégrer des liens dans ce salon.`);
        }
    },
};