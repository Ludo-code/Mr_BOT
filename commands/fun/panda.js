import { EmbedBuilder } from "discord.js";
import fetch from "node-fetch";

export const command = {
    name: 'panda',
    description: 'Send a random panda image',
    async execute(message, args) {
        try {
            let res = await (await fetch('https://some-random-api.ml/img/panda/'))?.json();
            if (!res?.link) return await message.reply('Could not fetch the image');
            
            let embed = new EmbedBuilder()
                .setTitle(`A panda image for you, ${message.member.nickname || message.author.username}`)
                .setColor('Random')
                .setImage(res.link);

            await message.reply({
                embeds: [embed],
            });
        } catch (error) {
            console.error(error);
        }
    },
};