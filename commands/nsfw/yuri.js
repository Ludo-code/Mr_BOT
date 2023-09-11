import { EmbedBuilder } from "discord.js";
import fetch from "node-fetch";

export const command = {
    name: 'yuri',
    description: 'Permet d\'envoyer une image de femme qui baise.',
    cooldown: 10,
    nsfw: true,
    async execute(message, args) {
        try {
            let res = await (await fetch('https://gallery.fluxpoint.dev/api/nsfw/img/yuri', {
  headers: {
    'Authorization': `${process.env.FLUXPOINT_API_KEY}`
  }
}))?.json();
            if (!res?.url) return await message.reply('Impossible de récupérer l\'image');
            
            let embed = new EmbedBuilder()
                .setTitle(`Une image de yuri pour toi, ${message.member.nickname || message.author.username}`)
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