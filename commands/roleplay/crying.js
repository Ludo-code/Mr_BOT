import { EmbedBuilder, PermissionsBitField } from "discord.js";
import logger from "../../utils/logger.js";
import { getNekos } from "../../utils/nekosBest.js";

export const command = {
    name: "pleure",
    aliases: ["cry", "crying"],
    description: "Envoie une image de quelq'un qui pleure",
    cooldown: 10,
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            const imageUrl = await getNekos("cry");
            if (!imageUrl) return await message.reply("impossible de récupérer l'image");

            let mentionedmember = message.mentions.members.first();

            let embed = new EmbedBuilder()
                .setTitle(`${mentionedmember ? (mentionedmember.nickname || mentionedmember.user.username) : (message.member.nickname || message.author.username)} pleure !`)
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
