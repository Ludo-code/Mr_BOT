import logger from "../../utils/logger.js";
import { EmbedBuilder, PermissionsBitField } from "discord.js";
import fetch from "node-fetch";

export const command = {
    name: "neko",
    description: "Envoie une image de neko aléatoire",
    cooldown: 10,
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            let res = await (await fetch("https://nekos.best/api/v2/neko"))?.json();
            if (!res?.results || !res?.results[0]?.url) return await message.reply("impossible de récupérer l'image");
            
            let embed = new EmbedBuilder()
                .setTitle(`Une image de neko pour toi, ${message.member.nickname || message.author.username}`)
                .setColor("Random")
                .setImage(res.results[0].url);

            await message.reply({
                embeds: [embed],
            });
        } catch (error) {
            logger.error(error);
        }
    },
};
