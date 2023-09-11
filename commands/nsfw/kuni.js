import { EmbedBuilder } from "discord.js";
import fetch from "node-fetch";

export const command = {
    name: 'cuni',
    aliases: ['kuni'],
    description: 'Permet d\'envoyer une image d\'un cuni.',
    cooldown: 10,
    nsfw: true,
    async execute(message, args) {
        try {
            let res = await (await fetch('https://gallery.fluxpoint.dev/api/nsfw/gif/kuni', {
  headers: {
    'Authorization': `${process.env.FLUXPOINT_API_KEY}`
  }
}))?.json();
            if (!res?.url) return await message.reply('Impossible de récupérer l\'image');
            
            let embed = new EmbedBuilder()
                .setTitle(`Une image de cuni pour toi, ${message.member.nickname || message.author.username}`)
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