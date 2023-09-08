import { EmbedBuilder } from "discord.js";
import config from "../../config.js";
const { websiteURL, githubURL, supportServerURL } = config;

export const command = {
    name: 'info-bot',
    description: 'Shows the bot details',
    async execute(message, args) {
        try {
            let desc = `## Statistics\n- Servers: **${message.client.guilds.cache.size}**\n- Users: **${message.client.guilds.cache.reduce((acc, val) => acc + (val.memberCount ?? 0), 0)}**\n- Channels: **${message.client.channels.cache.size}**\n\n`;
            desc += `## Links\n- Website: ${websiteURL}\n- GitHub: ${githubURL}\n- Support Server: ${supportServerURL}`
            let embed = new EmbedBuilder()
                .setDescription(desc)
                .setThumbnail(message.client.user.displayAvatarURL({
                    size: 1024,
                    extension: 'png',
                    forceStatic: false
                }))
                .setFooter({
                    text: `Requested by: @${message.author.username} [${message.author.id}]`
                });

            await message.reply({
                embeds: [embed],
            })
        } catch (error) {
            console.error(error);
        }
    },
};