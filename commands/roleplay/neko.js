import logger from "../../utils/logger.js";
import { EmbedBuilder, PermissionsBitField } from "discord.js";
import { getNekos } from "../../utils/nekosBest.js";

export const command = {
    name: "neko",
    description: "Envoie une image de neko aléatoire",
    cooldown: 10,
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            const imageUrl = await getNekos("neko");
            if (!imageUrl) return await message.reply("impossible de récupérer l'image");
            
            let embed = new EmbedBuilder()
                .setTitle(`Une image de neko pour toi, ${message.member.nickname || message.author.username}`)
                .setColor("Random")
                .setImage(imageUrl);

            await message.reply({
                embeds: [embed],
            });
        } catch (error) {
            logger.error(error);
        }
    },
};
