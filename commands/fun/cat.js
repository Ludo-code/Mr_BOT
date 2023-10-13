import { EmbedBuilder, PermissionsBitField } from "discord.js";
import fetch from "node-fetch";

export const command = {
    name: 'chat',
    description: 'Envoie une image de chat aléatoire.',
    cooldown: 10,
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            let embed = new EmbedBuilder()
                .setTitle(`Une image de chat pour toi, ${message.member.nickname || message.author.username}`)
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