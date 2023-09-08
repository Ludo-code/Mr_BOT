import { EmbedBuilder } from "discord.js";
import fetch from "node-fetch";
import 'dotenv/config';

export const command = {
    name: 'good_night',
    description: 'Send a random good night image',
    async execute(message, args) {
        try {
            let res = await (await fetch(`https://g.tenor.com/v1/random?id=8776030&key=${process.env.TENOR_API_KEY}&limit=1&q=good+night+anime`))?.json();
            if (!res?.results || !res.results[0]?.media || !res.results[0]?.media[0]?.gif?.url) return await message.reply('Could not fetch the image');

            let mentionedmember = message.mentions.members.first();

            let embed = new EmbedBuilder()
                .setTitle(`Good night, ${mentionedmember ? (mentionedmember.nickname || mentionedmember.user.username) : (message.member.nickname || message.author.username)}`)
                .setColor('Random')
                .setImage(res.results[0]?.media[0]?.gif?.url);

            await message.reply({
                ...(mentionedmember && { content: `${mentionedmember}` }),
                embeds: [embed],
            });
        } catch (error) {
            console.error(error);
        }
    },
};