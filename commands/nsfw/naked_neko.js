import { EmbedBuilder } from "discord.js";
import fetch from "node-fetch";
import 'dotenv/config';

export const command = {
    name: 'nekonue',
    description: 'Permet d\'envoyer une image d\'une neko nue.',
    cooldown: 10,
    nsfw: true,
    async execute(message, args) {
        try {
            let res = await (await fetch('https://gallery.fluxpoint.dev/api/nsfw/img/neko', {
  headers: {
    'Authorization': `${process.env.FLUXPOINT_API_KEY}`
  }
}))?.json();
            if (!res?.url) return await message.reply('Impossible de récupérer l\'image');
            
            let embed = new EmbedBuilder()
                .setTitle(`Une image d'une neko nue pour toi, ${message.member.nickname || message.author.username}`)
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