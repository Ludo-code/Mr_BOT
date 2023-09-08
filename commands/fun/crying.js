import { EmbedBuilder } from "discord.js";
import fetch from "node-fetch";

export const command = {
    name: 'crying',
    description: 'Send a random crying image',
    async execute(message, args) {
        try {
            let res = await (await fetch('https://nekos.best/api/v2/cry'))?.json();
            if (!res?.results || !res?.results[0]?.url) return await message.reply('Could not fetch the image');

            let mentionedmember = message.mentions.members.first();

            let embed = new EmbedBuilder()
                .setTitle(`Are you crying? ${mentionedmember ? (mentionedmember.nickname || mentionedmember.user.username) : (message.member.nickname || message.author.username)}`)
                .setColor('Random')
                .setImage(res.results[0].url);

            await message.reply({
                ...(mentionedmember && { content: `${mentionedmember}` }),
                embeds: [embed],
            });
        } catch (error) {
            console.error(error);
        }
    },
};