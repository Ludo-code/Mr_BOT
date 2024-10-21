import { EmbedBuilder, PermissionsBitField } from "discord.js";
import fetch from "node-fetch";

export const command = {
    name: "neko",
    description: "Envoie une image de neko aléatoire",
    cooldown: 10,
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            let res = await (await fetch("https://nekos.life/api/v2/img/neko"))?.json();
            if (!res?.url) return await message.reply("Impossible de récupérer l\'image");
            
            let embed = new EmbedBuilder()
                .setTitle(`Une image de neko pour toi, ${message.member.nickname || message.author.username}`)
                .setColor("Random")
                .setImage(res.url);

            await message.reply({
                embeds: [embed],
            });
        } catch (error) {
            console.error(error);
        }
    },
};
