import { EmbedBuilder, PermissionsBitField } from "discord.js";
import fetch from "node-fetch";
import logger from "../../utils/logger.js";

export const command = {
    name: "chat",
    aliases: ["cat", "kitty"],
    description: "Envoie une image de chat aléatoire.",
    cooldown: 10,
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            let res = await (await fetch("https://cataas.com/cat?json=true"))?.json();
            if (!res.url) return await message.reply("impossible de récupérer l'image");
            
            let embed = new EmbedBuilder()
                .setTitle(`Une image de chat pour toi, ${message.member.nickname || message.author.username}`)
                .setColor("Random")
                .setImage(res.url);

            await message.reply({
                embeds: [embed],
            });
        } catch (error) {
            logger.error(error);
        }
    },
};
