import { EmbedBuilder, PermissionsBitField } from "discord.js";
import fetch from "node-fetch";

export const command = {
    name: "rougit",
    aliases: ["rougir", "blush"],
    description: "Envoie une image de personne qui rougis aléatoire.",
    cooldown: 10,
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            let res = await (await fetch("https://nekos.best/api/v2/blush"))?.json();
            if (!res?.results || !res?.results[0]?.url) return await message.reply("impossible de récupérer l'image");
            
            let embed = new EmbedBuilder()
                .setTitle(`${message.member.nickname || message.author.username} rougit.`)
                .setColor("Random")
                .setImage(res.results[0].url);

            await message.reply({
                embeds: [embed],
            });
        } catch (error) {
            console.error(error);
        }
    },
};
