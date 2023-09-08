import { EmbedBuilder } from "discord.js";
import fetch from "node-fetch";

export const command = {
    name: 'neko',
    description: 'Send a random neko image',
    nsfw: true,
    async execute(message, args) {
        try {
            let res = await (await fetch('https://nekos.life/api/v2/img/neko'))?.json();
            if (!res?.url) return await message.reply('Could not fetch the image');
            
            let embed = new EmbedBuilder()
                .setTitle(`A neko image for you, ${message.member.nickname || message.author.username}`)
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