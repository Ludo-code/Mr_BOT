import { EmbedBuilder, PermissionsBitField } from "discord.js";
import config from "../../config.js";
import logger from "../../utils/logger.js";
import { Guild } from "../../schema/schema.js";
import { getTranslations } from "../../lang/index.js";
const { websiteURL, githubURL, supportServerURL } = config;

export const command = {
    name: "info-bot",
    description: "Affiche les informations sur le bot",
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            let [g] = await Guild.findOrCreate({ where: { guildId: message.guild.id } });
            const translations = getTranslations(g?.toJSON()?.language || 'fr');

            let desc = `## Statistiques\n- Serveurs : **${message.client.guilds.cache.size}**\n- Utilisateurs : **${message.client.guilds.cache.reduce((acc, val) => acc + (val.memberCount ?? 0), 0)}**\n- Salons : **${message.client.channels.cache.size}**\n\n`;
            desc += `## Liens\n- Site Internet: ${websiteURL}\n- GitHub : ${githubURL}\n- Serveur de Support: ${supportServerURL}`
            let embed = new EmbedBuilder()
                .setDescription(desc)
                .setThumbnail(message.client.user.displayAvatarURL({
                    size: 1024,
                    extension: "png",
                    forceStatic: false
                }))
                .setFooter({
                    text: translations.messages.REQUESTED_BY.replace('{user}', `@${message.author.username} [${message.author.id}]`)
                });

            await message.reply({
                embeds: [embed],
            })
        } catch (error) {
            logger.error(error);
        }
    },
};
