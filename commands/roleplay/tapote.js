import logger from "../../utils/logger.js";
import { EmbedBuilder, PermissionsBitField } from "discord.js";
import fetch from "node-fetch";

export const command = {
    name: "tapote",
    description: "Permet d'envoyer une image de quelqu'un qui tapote",
    cooldown: 10,
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            let res = await (await fetch("https://nekos.best/api/v2/pat"))?.json();
            if (!res?.results || !res?.results[0]?.url) return await message.reply("impossible de récupérer l'image");
            
            let mentionedmember = message.mentions.members.first();

            let embed = new EmbedBuilder()
                .setTitle(`${mentionedmember ? (mentionedmember.nickname || mentionedmember.user.username) : (message.member.nickname || message.author.username)} se fait tapoter.`)
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
