import { EmbedBuilder } from "discord.js";
import config from "../../config.js";
const { websiteURL, githubURL, supportServerURL } = config;

export const command = {
    name: 'info-bot',
    description: 'Affiche les informations sur le bot',
    async execute(message, args) {
        try {
            let desc = `## Statistique\n- Serveurs : **${message.client.guilds.cache.size}**\n- Utilisateurs : **${message.client.guilds.cache.reduce((acc, val) => acc + (val.memberCount ?? 0), 0)}**\n- Salons : **${message.client.channels.cache.size}**\n\n`;
            desc += `## Liens\n- Site Internet: ${websiteURL}\n- GitHub : ${githubURL}\n- Serveur de Support: ${supportServerURL}`
            let embed = new EmbedBuilder()
                .setDescription(desc)
                .setThumbnail(message.client.user.displayAvatarURL({
                    size: 1024,
                    extension: 'png',
                    forceStatic: false
                }))
                .setFooter({
                    text: `Demandé par : @${message.author.username} [${message.author.id}]`
                });

            await message.reply({
                embeds: [embed],
            })
        } catch (error) {
            console.error(error);
        }
    },
};