import logger from "../../utils/logger.js";
import { EmbedBuilder, PermissionsBitField } from "discord.js";
import { getNekos } from "../../utils/nekosBest.js";

export const command = {
    name: "bonjour",
    aliases: ["salut", "bonsoir"],
    description: "Permet d'envoyer une image d'une personne qui salut.",
    cooldown: 10,
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            const imageUrl = await getNekos("wave");
            if (!imageUrl) return await message.reply("impossible de récupérer l'image");
            
            let embed = new EmbedBuilder()
                .setTitle(`${message.member.nickname || message.author.username} salut tout le monde.`)
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
