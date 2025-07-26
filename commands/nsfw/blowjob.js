import { EmbedBuilder, PermissionsBitField } from "discord.js";
import fetch from "node-fetch";
import "dotenv/config";
import logger from "../../utils/logger.js";

export const command = {
    name: "suce",
    aliases: ["blowjob", "sucer"],
    description: "Envoie une image de quelqu'un qui suce.",
    cooldown: 10,
    nsfw: true,
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            let res = await (await fetch("https://api.fluxpoint.dev/nsfw/gif/blowjob", {
  headers: {
    "Authorization": `${process.env.FLUXPOINT_API_KEY}`
  }
}))?.json();
            if (!res?.file) return await message.reply("Impossible de récupérer l'image.");
           
            let mentionedmember = message.mentions.members.first();

            let embed = new EmbedBuilder()
                .setTitle(`${mentionedmember ? (mentionedmember.nickname || mentionedmember.user.username) : (message.member.nickname || message.author.username)} se fais sucer.`)
                .setColor("Random")
                .setImage(res.file);


            await message.reply({
                embeds: [embed],
            });
        } catch (error) {
            logger.error(error);
        }
    },
};
