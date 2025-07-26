import { ChannelType, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { Guild, Ticket } from "../schema/schema.js";
import logger from "../utils/logger.js";

const handleButton = async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId == "ticketcreate") {
        try {
            await interaction.deferUpdate({
                fetchReply: true,
                ephemeral: true
            });

            let [g] = await Guild.findOrCreate({
                where: {
                    guildId: interaction.guild.id,
                }
            });

            let channelexists = await interaction.guild.channels.cache.find(c => c.name == `ticket_${interaction.user.id}`);

            if (channelexists) {
                return await interaction.followUp({
                    content: `Un ticket a déjà été ouvert pour vous : ${channelexists}.`,
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
                content: `Ticket créé pour vous (${ticketchannel}).`,
                ephemeral: true
            });

        } catch (error) {
            logger.error(error);
        }
    }

    if (interaction.customId.startsWith("aide_") && !interaction.customId.startsWith("aide_nsfw_")) {
        try {
            await interaction.deferUpdate();

            const parts = interaction.customId.split("_");
            const action = parts[1];
            const currentPageStr = parts[2];
            const totalPagesStr = parts[3];
            const userId = parts[4];
            const currentPage = parseInt(currentPageStr, 10);

            if (String(interaction.user.id) !== String(userId)) {
                return await interaction.followUp({
                    content: "Seul l'utilisateur ayant initié cette commande peut utiliser ces boutons.",
                    ephemeral: true
                });
            }

            const commands = Array.from(interaction.client.commands.values())
                .filter(cmd => !cmd.nsfw && typeof cmd.name === "string")
                .sort((a, b) => a.name.localeCompare(b.name));

            const chunkSize = 10;
            const totalCommands = commands.length;
            const totalPages = Math.ceil(totalCommands / chunkSize);

            let newPage = currentPage;
            if (action === "first") newPage = 0;
            else if (action === "prev") newPage = Math.max(0, currentPage - 1);
            else if (action === "next") newPage = Math.min(totalPages - 1, currentPage + 1);
            else if (action === "last") newPage = totalPages - 1;

            const start = newPage * chunkSize;
            const end = start + chunkSize;
            const pageCommands = commands.slice(start, end);
            const commandList = pageCommands
                .map(cmd => `» ${cmd.name} ‣ ${cmd.description || "Aucune description."}`)
                .join("\n");

            const updatedEmbed = new EmbedBuilder()
                .setTitle("Commandes")
                .setDescription(commandList)
                .setColor("Blue")
                .setFooter({ text: `Page: ${newPage + 1}/${totalPages}` });

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId(`aide_first_${newPage}_${totalPages}_${userId}`)
                    .setLabel("⏮️")
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(newPage === 0),
                new ButtonBuilder()
                    .setCustomId(`aide_prev_${newPage}_${totalPages}_${userId}`)
                    .setLabel("◀️")
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(newPage === 0),
                new ButtonBuilder()
                    .setCustomId(`aide_next_${newPage}_${totalPages}_${userId}`)
                    .setLabel("▶️")
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(newPage === totalPages - 1),
                new ButtonBuilder()
                    .setCustomId(`aide_last_${newPage}_${totalPages}_${userId}`)
                    .setLabel("⏭️")
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(newPage === totalPages - 1)
            );

            await interaction.editReply({
                embeds: [updatedEmbed],
                components: [row],
            });
        } catch (error) {
            logger.error(error);
            if (!interaction.deferred && !interaction.replied) {
                await interaction.reply({
                    content: "Une erreur est survenue lors de la manipulation de ce bouton.",
                    ephemeral: true,
                });
            }
        }
    }

    if (interaction.customId.startsWith("aide_nsfw_")) {
        try {
            await interaction.deferUpdate();

            const parts = interaction.customId.split("_");
            const action = parts[2];
            const currentPageStr = parts[3];
            const totalPagesStr = parts[4];
            const userId = parts[5];
            const currentPage = parseInt(currentPageStr, 10);

            if (String(interaction.user.id) !== String(userId)) {
                return await interaction.followUp({
                    content: "Seul l'utilisateur ayant initié cette commande peut utiliser ces boutons.",
                    ephemeral: true
                });
            }

            const commands = Array.from(interaction.client.commands.values())
                .filter(cmd => cmd.nsfw && typeof cmd.name === "string")
                .sort((a, b) => a.name.localeCompare(b.name));

            const chunkSize = 10;
            const totalCommands = commands.length;
            const totalPages = Math.ceil(totalCommands / chunkSize);

            let newPage = currentPage;
            if (action === "first") newPage = 0;
            else if (action === "prev") newPage = Math.max(0, currentPage - 1);
            else if (action === "next") newPage = Math.min(totalPages - 1, currentPage + 1);
            else if (action === "last") newPage = totalPages - 1;

            const start = newPage * chunkSize;
            const end = start + chunkSize;
            const pageCommands = commands.slice(start, end);
            const commandList = pageCommands
                .map(cmd => `» ${cmd.name} ‣ ${cmd.description || "Aucune description."}`)
                .join("\n");

            const updatedEmbed = new EmbedBuilder()
                .setTitle("Commandes NSFW")
                .setDescription(commandList)
                .setColor("Blue")
                .setFooter({ text: `Page: ${newPage + 1}/${totalPages}` });

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId(`aide_nsfw_first_${newPage}_${totalPages}_${userId}`)
                    .setLabel("⏮️")
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(newPage === 0),
                new ButtonBuilder()
                    .setCustomId(`aide_nsfw_prev_${newPage}_${totalPages}_${userId}`)
                    .setLabel("◀️")
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(newPage === 0),
                new ButtonBuilder()
                    .setCustomId(`aide_nsfw_next_${newPage}_${totalPages}_${userId}`)
                    .setLabel("▶️")
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(newPage === totalPages - 1),
                new ButtonBuilder()
                    .setCustomId(`aide_nsfw_last_${newPage}_${totalPages}_${userId}`)
                    .setLabel("⏭️")
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(newPage === totalPages - 1)
            );

            await interaction.editReply({
                embeds: [updatedEmbed],
                components: [row],
            });
        } catch (error) {
            logger.error(error);
            if (!interaction.deferred && !interaction.replied) {
                await interaction.reply({
                    content: "Une erreur est survenue lors de la manipulation de ce bouton.",
                    ephemeral: true,
                });
            }
        }
    }
}

export default handleButton;
