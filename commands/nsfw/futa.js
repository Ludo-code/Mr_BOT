import { EmbedBuilder, PermissionsBitField } from "discord.js";
import fetch from "node-fetch";
import "dotenv/config";

export const command = {
    name: "futa",
    aliases: ["futanari"],
    description: "Permet d'envoyer une image d'une futanari.",
    cooldown: 10,
    nsfw: true,
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            let res = await (await fetch("https://api.fluxpoint.dev/nsfw/img/futa", {
  headers: {
    "Authorization": `${process.env.FLUXPOINT_API_KEY}`
  }
}))?.json();
            if (!res?.file) return await message.reply("Impossible de récupérer l'image.");
           
            let mentionedmember = message.mentions.members.first();

            let embed = new EmbedBuilder()
                .setTitle(`${mentionedmember ? (mentionedmember.nickname || mentionedmember.user.username) : (message.member.nickname || message.author.username)} se fais défleurer par surprise.`)
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
