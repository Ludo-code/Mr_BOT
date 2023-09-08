import { ChannelType, Colors, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { Guild, Ticket } from "../schema/schema.js";

const handleButton = async interaction => {
    if (!interaction.isButton()) return;
    if (interaction.customId == 'ticketcreate') {
        try {
            await interaction.deferUpdate({
                fetchReply: true,
                ephemeral: true
            });

            let [g, created] = await Guild.findOrCreate({
                where: {
                    guildId: interaction.guild.id,
                }
            })

            let channelexists = await interaction.guild.channels.cache.find(c => c.name == `ticket_${interaction.user.id}`);

            if (channelexists) {
                return await interaction.followUp({
                    content: `Un ticket à déjà été ouvert pour vous : ${channelexists}.`,
                    ephemeral: true
                });
            }

            let parentTicketChannel = interaction.guild.channels.cache.get(g.ticketCategoryChannelID);

            let ticketchannel = await interaction.guild.channels.create({
                name: `ticket_${interaction.user.id}`,
                type: ChannelType.GuildText,
                ...(parentTicketChannel && { parent: parentTicketChannel?.id }),
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel],
                    },
                    {
                        id: interaction.guild.client?.user?.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks, PermissionFlagsBits.ReadMessageHistory],
                    },
                    {
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.ReadMessageHistory],
                    },
                ],
            });

            await Ticket.create({
                userId: interaction.user.id,
                guildId: interaction.guild.id,
                channelId: ticketchannel.id
            });

            await interaction.followUp({
                content: `Ticket créer pour vous (${ticketchannel}).`,
                ephemeral: true
            });

        } catch (error) {
            console.error(error);
        }

    }
}

export default handleButton;