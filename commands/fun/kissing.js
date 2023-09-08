import { EmbedBuilder } from "discord.js";
import fetch from "node-fetch";

export const command = {
    name: 'kissing',
    description: 'Send a random kissing image',
    nsfw: true,
    async execute(message, args) {
        try {
            let res = await (await fetch('https://nekos.life/api/v2/img/kiss'))?.json();
            if (!res?.url) return await message.reply('Could not fetch the image');

            let mentionedmember = message.mentions.members.first();

            let embed = new EmbedBuilder()
                .setTitle(`A kiss for you, ${mentionedmember ? (mentionedmember.nickname || mentionedmember.user.username) : (message.member.nickname || message.author.username)}`)
                .setColor('Random')
                .setImage(res.url);


            await message.reply({
                ...(mentionedmember && { content: `${mentionedmember}` }),
                embeds: [embed],
            });
        } catch (error) {
            console.error(error);
        }
    },
};