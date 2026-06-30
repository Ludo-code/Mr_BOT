import logger from "../../utils/logger.js";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, EmbedBuilder, PermissionsBitField } from "discord.js";
import { Guild } from "../../schema/schema.js";
import { getTranslations } from "../../lang/index.js";

export const command = {
    name: "catégorie-ticket",
    aliases: ["categorie-ticket", "ticket-category"],
    description: "Permet de définir une catégorie dans laquel les ticket seront créer.",
    args: true,
    usage: "<category_channel>",
    staffOnly: true,
    clientpermissions: [PermissionsBitField.Flags.SendMessages],
    async execute(message, args) {
        try {
            let [g] = await Guild.findOrCreate({ where: { guildId: message.guild.id } });
            const translations = getTranslations(g?.toJSON()?.language || 'fr');

            let channel = message.mentions.channels.first();
            if (!channel && args[0]) {
                try {
                    channel = await message.guild.channels.cache.get(args[0]);
                } catch (error) {
                    logger.error(error);
                }
            }

            if (!channel || channel.type != ChannelType.GuildCategory) {
                return await message.reply(translations.messages.CATEGORY_MENTION);
            }

            let [guildRow] = await Guild.findOrCreate({
                where: {
                    guildId: message.guild.id,
                }
            });

            guildRow.ticketCategoryChannelID = channel.id;
            await guildRow.save();

            await message.reply(translations.messages.CATEGORY_SET.replace('{channel}', `${channel}`));

        } catch (error) {
            logger.error(error);
            await message.reply(translations.messages.CATEGORY_CREATE_ERROR);
        }
    },
};
