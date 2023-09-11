import { EmbedBuilder } from "discord.js";
import fetch from "node-fetch";
import 'dotenv/config';

export const command = {
    name: 'yaoi',
    description: 'Envoie une image de quelqu\'un qui se fait baiser pas un homme.',
    cooldown: 10,
    nsfw: true,
    async execute(message, args) {
        try {
            let res = await (await fetch('https://gallery.fluxpoint.dev/api/nsfw/img/yaoi', {
  headers: {
    'Authorization': `${process.env.FLUXPOINT_API_KEY}`
  }
}))?.json();
            if (!res?.url) return await message.reply('Impossible de récupérer l\'image.');
           
            let mentionedmember = message.mentions.members.first();

            let embed = new EmbedBuilder()
                .setTitle(`${mentionedmember ? (mentionedmember.nickname || mentionedmember.user.username) : (message.member.nickname || message.author.username)} se fais baiser.`)
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