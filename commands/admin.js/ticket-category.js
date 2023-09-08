import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, EmbedBuilder } from "discord.js";
import { Guild } from "../../schema/schema.js";

export const command = {
    name: 'ticket-category',
    description: 'Set the ticket category channel',
    args: true,
    usage: '<category_channel>',
    staffOnly: true,
    async execute(message, args) {
        try {
            let channel = message.mentions.channels.first();
            if (!channel && args[0]) {
                try {
                    channel = await message.guild.channels.cache.get(args[0]);
                } catch (error) {
                    console.error(error);
                }
            }

            if (!channel || channel.type != ChannelType.GuildCategory) {
                return await message.reply(`Please mention a category channel or provide a category channel ID.`);
            }

            let [g] = await Guild.findOrCreate({
                where: {
                    guildId: message.guild.id,
                }
            });

            g.ticketCategoryChannelID = channel.id;
            await g.save();

            await message.reply(`Ticket category channel set to ${channel}.`);

        } catch (error) {
            console.error(error);
            await message.reply(`Could not set the ticket category channel.`);
        }
    },
};