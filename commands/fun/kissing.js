import { EmbedBuilder } from "discord.js";
import fetch from "node-fetch";

export const command = {
    name: 'embrasse',
    aliases: ['embrasser', 'bisou', 'bisous'],
    description: 'Envoie une image de quelqu\'un qui embrasse.',
    async execute(message, args) {
        try {
            let res = await (await fetch('https://nekos.life/api/v2/img/kiss'))?.json();
            if (!res?.url) return await message.reply('Impossible de récupérer l\'image');

            let mentionedmember = message.mentions.members.first();

            let embed = new EmbedBuilder()
                .setTitle(`${mentionedmember ? (mentionedmember.nickname || mentionedmember.user.username) : (message.member.nickname || message.author.username)} se fait embrasser.`)
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