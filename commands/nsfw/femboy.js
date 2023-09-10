import { EmbedBuilder } from "discord.js";
import fetch from "node-fetch";

export const command = {
    name: 'femboy',
    aliases: ['trans', 'transgenre'],
    description: 'Permet d\'envoyer une image d\'une transgenre.',
    cooldown: 10,
    nsfw: true,
    async execute(message, args) {
        try {
            let res = await (await fetch('https://api.waifu.pics/nsfw/trap'))?.json();
            if (!res?.url) return await message.reply('Impossible de récupérer l\'image');
            
            let embed = new EmbedBuilder()
                .setTitle(`Une image d'une transgenre pour toi, ${message.member.nickname || message.author.username}`)
                .setColor('Random')
                .setImage(res.url);

            await message.reply({
                embeds: [embed],
            });
        } catch (error) {
            console.error(error);
        }
    },
};