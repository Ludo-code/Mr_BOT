import { EmbedBuilder, PermissionsBitField } from "discord.js";
import fetch from "node-fetch";
import "dotenv/config";

export const command = {
    name: "tentacle",
    description: "Permet d\'envoyer une image de tentacle.",
    cooldown: 10,
    nsfw: true,
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            let res = await (await fetch("https://gallery.fluxpoint.dev/api/nsfw/gif/tentacle", {
  headers: {
    "Authorization": `${process.env.FLUXPOINT_API_KEY}`
  }
}))?.json();
            if (!res?.file) return await message.reply("Impossible de récupérer l\'image");
            
            let embed = new EmbedBuilder()
                .setTitle(`Une image de tentacle pour toi, ${message.member.nickname || message.author.username}`)
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
