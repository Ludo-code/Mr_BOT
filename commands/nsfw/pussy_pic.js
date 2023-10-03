import { EmbedBuilder, PermissionsBitField } from "discord.js";
import fetch from "node-fetch";
import 'dotenv/config';

export const command = {
    name: 'chatte_img',
    aliases: ['pussy_img', 'pussy-img', 'pussyimg', 'chatte-img', 'chatteimg'],
    description: 'Permet d\'envoyer une image d\'une chatte.',
    cooldwon: 10,
    nsfw: true,
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            let res = await (await fetch('https://gallery.fluxpoint.dev/api/nsfw/img/pussy', {
  headers: {
    'Authorization': `${process.env.FLUXPOINT_API_KEY}`
  }
}))?.json();

            if (!res?.file) return await message.reply('Impossible de récupérer l\'image');
            
            let embed = new EmbedBuilder()
                .setTitle(`Une image d'une chatte pour toi, ${message.member.nickname || message.author.username}`)
                .setColor('Random')
                .setImage(res.file);

            await message.reply({
                embeds: [embed],
            });
        } catch (error) {
            console.error(error);
        }
    },
};