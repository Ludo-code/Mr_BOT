import logger from "../../utils/logger.js";
import { EmbedBuilder, PermissionsBitField } from "discord.js";
import fetch from "node-fetch";
import "dotenv/config";

export const command = {
    name: "bonne_nuit",
    aliases: ["bonnenuit", "bonne-nuit"],
    description: "Envoie une image aléatoire de Bonne Nuit.",
    cooldown: 10,
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            let res = await (await fetch(`https://tenor.googleapis.com/v2/search?key=${process.env.TENOR_API_KEY}&client_key=${process.env.TENOR_API_KEY_NAME}&random=true&limit=1&q=good+night+anime`))?.json();
            if (!res?.results || !res.results[0]?.media_formats || !res.results[0]?.media_formats?.gif?.url) return await message.reply("Impossible d'obtenir l'image");

            let mentionedmember = message.mentions.members.first();

            let embed = new EmbedBuilder()
                .setTitle(`Bonne Nuit, ${mentionedmember ? (mentionedmember.nickname || mentionedmember.user.username) : (message.member.nickname || message.author.username)}`)
                .setColor("Random")
                .setImage(res.results[0]?.media_formats?.gif?.url);

            await message.reply({
                embeds: [embed],
            });
        } catch (error) {
            logger.error(error);
        }
    },
};
