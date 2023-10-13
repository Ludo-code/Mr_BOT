import { EmbedBuilder, PermissionsBitField } from "discord.js";
import fetch from "node-fetch";
import 'dotenv/config';

export const command = {
    name: 'cum_img',
    aliases: ['ejac_img', 'ejaculation_img', 'cumimg', 'cum-img', 'ejac-img', 'ejacimg'],
    description: 'Envoie une image de quelqu\'un qui éjacule.',
    cooldown: 10,
    nsfw: true,
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            let res = await (await fetch('https://gallery.fluxpoint.dev/api/nsfw/img/cum', {
  headers: {
    'Authorization': `${process.env.FLUXPOINT_API_KEY}`
  }
}))?.json();
            if (!res?.file) return await message.reply('Impossible de récupérer l\'image.');
           
            let mentionedmember = message.mentions.members.first();

            let embed = new EmbedBuilder()
                .setTitle(`${mentionedmember ? (mentionedmember.nickname || mentionedmember.user.username) : (message.member.nickname || message.author.username)} se fait recouvrir.`)
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