import { EmbedBuilder, PermissionsBitField } from "discord.js";
import fetch from "node-fetch";

export const command = {
    name: "panda",
    description: "Envoie une image de Panda aléatoire.",
    cooldown: 10,
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            let res = await (await fetch("https://some-random-api.com/img/panda"))?.json();
            if (!res?.link) return await message.reply("Impossible de récupérer l\'image.");
            
            let embed = new EmbedBuilder()
                .setTitle(`Une image de panda pour toi, ${message.member.nickname || message.author.username}`)
                .setColor("Random")
                .setImage(res.link);

            await message.reply({
                embeds: [embed],
            });
        } catch (error) {
            console.error(error);
        }
    },
};
