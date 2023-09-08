import { EmbedBuilder } from "discord.js";
import fetch from "node-fetch";

export const command = {
    name: 'cat',
    description: 'Send a random cat image',
    async execute(message, args) {
        try {
            let embed = new EmbedBuilder()
                .setTitle(`A cat image for you, ${message.member.nickname || message.author.username}`)
                .setColor('Random')
                .setImage(`https://cataas.com/cat/says/%20?noCache=${Date.now()}_${String(Math.random()).replace(/\./g,'')}`);

            await message.reply({
                embeds: [embed],
            });
        } catch (error) {
            console.error(error);
        }
    },
};