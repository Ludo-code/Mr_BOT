import { EmbedBuilder } from "discord.js";
import fetch from "node-fetch";

export const command = {
    name: 'suce',
    aliases: ['blowjob', 'sucer'],
    description: 'Envoie une image de quelqu\'un qui suce.',
    cooldown: 10,
    nsfw: true,
    async execute(message, args) {
        try {
            let res = await (await fetch('https://api.waifu.pics/nsfw/blowjob'))?.json();
            if (!res?.url) return await message.reply('Impossible de récupérer l\'image.');
           
            let mentionedmember = message.mentions.members.first();

            let embed = new EmbedBuilder()
                .setTitle(`${mentionedmember ? (mentionedmember.nickname || mentionedmember.user.username) : (message.member.nickname || message.author.username)} se fais sucer.`)
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