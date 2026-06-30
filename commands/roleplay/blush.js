import { EmbedBuilder, PermissionsBitField } from "discord.js";
import logger from "../../utils/logger.js";
import { getNekos } from "../../utils/nekosBest.js";

export const command = {
    name: "rougit",
    aliases: ["rougir", "blush"],
    description: "Envoie une image de personne qui rougis aléatoire.",
    cooldown: 10,
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            const imageUrl = await getNekos("blush");
            if (!imageUrl) return await message.reply("impossible de récupérer l'image");

            let embed = new EmbedBuilder()
                .setTitle(`${message.member.nickname || message.author.username} rougit.`)
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
