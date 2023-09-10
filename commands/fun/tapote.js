import { EmbedBuilder } from "discord.js";
import fetch from "node-fetch";

export const command = {
    name: 'tapote',
    description: 'Permet d\'envoyer une image de quelqu\'un qui tapote',
    cooldown: 10,
    async execute(message, args) {
        try {
            let res = await (await fetch('https://nekos.life/api/v2/img/pat'))?.json();
            if (!res?.url) return await message.reply('Impossible de récupérer l\'image.');
            
            let mentionedmember = message.mentions.members.first();

            let embed = new EmbedBuilder()
                .setTitle(`${mentionedmember ? (mentionedmember.nickname || mentionedmember.user.username) : (message.member.nickname || message.author.username)} se fait tapoter.`)
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