import logger from "../../utils/logger.js";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, EmbedBuilder, PermissionsBitField } from "discord.js";
import { Guild } from "../../schema/schema.js";

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
            let channel = message.mentions.channels.first();
            if (!channel && args[0]) {
                try {
                    channel = await message.guild.channels.cache.get(args[0]);
                } catch (error) {
                    logger.error(error);
                }
            }

            if (!channel || channel.type != ChannelType.GuildCategory) {
                return await message.reply(`Merci de mentionner le nom de la catégorie ou donner son ID.`);
            }

            let [g] = await Guild.findOrCreate({
                where: {
                    guildId: message.guild.id,
                }
            });

            g.ticketCategoryChannelID = channel.id;
            await g.save();

            await message.reply(`La catégorie de cration des ticket est maintenant sur ${channel}.`);

        } catch (error) {
            logger.error(error);
            await message.reply(`Impossible de créer la catégorie.`);
        }
    },
};
