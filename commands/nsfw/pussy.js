import { EmbedBuilder, PermissionsBitField } from "discord.js";
import fetch from "node-fetch";
import "dotenv/config";

export const command = {
    name: "chatte_gif",
    aliases: ["pussy_gif", "pussy-gif", "pussygif", "chatte-gif", "chattegif"],
    description: "Permet d'envoyer une image d'une chatte.",
    cooldwon: 10,
    nsfw: true,
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            let res = await (await fetch("https://api.fluxpoint.dev/nsfw/gif/pussy", {
  headers: {
    "Authorization": `${process.env.FLUXPOINT_API_KEY}`
  }
}))?.json();
            if (!res?.file) return await message.reply("Impossible de récupérer l'image");
            
            let embed = new EmbedBuilder()
                .setTitle(`Une image d'une chatte pour toi, ${message.member.nickname || message.author.username}`)
                .setColor("Random")
                .setImage(res.file);

            await message.reply({
                embeds: [embed],
            });
        } catch (error) {
            console.error(error);
        }
    },
};
