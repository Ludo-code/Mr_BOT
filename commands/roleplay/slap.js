import { EmbedBuilder, PermissionsBitField } from "discord.js";
import fetch from "node-fetch";

export const command = {
    name: "gifle",
    aliases: ["baffe"],
    description: "Envoie une image de quelqu'un qui gifle",
    cooldown: 10,
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            let res = await (await fetch("https://nekos.best/api/v2/slap"))?.json();
            if (!res?.results || !res?.results[0]?.url) return await message.reply("impossible de récupérer l'image");

            let mentionedmember = message.mentions.members.first();

            let embed = new EmbedBuilder()
                .setTitle(`${mentionedmember ? (mentionedmember.nickname || mentionedmember.user.username) : (message.member.nickname || message.author.username)} se fait gifler.`)
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
