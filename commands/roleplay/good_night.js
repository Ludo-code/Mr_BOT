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
            let res = await (await fetch(`https://api.klipy.com/api/v1/${process.env.KLIPY_API_KEY}/gifs/search?customer_id=${process.env.KLIPY_API_KEY_NAME}&limit=24&q=good+night+anime`))?.json();
            if (!res?.data?.data || !res.data.data[0]?.file) return await message.reply("Impossible d'obtenir l'image");

            const randomizeresults = Math.floor(Math.random() * res.data.data.length);
            let gifselector = res.data.data[randomizeresults]?.file?.hd?.gif?.url || res.data.data[randomizeresults]?.file?.md?.gif?.url || res.data.data[randomizeresults]?.file?.sm?.gif?.url || res.data.data[randomizeresults]?.file?.xs?.gif?.url;

            let mentionedmember = message.mentions.members.first();

            let embed = new EmbedBuilder()
                .setTitle(`Bonne Nuit, ${mentionedmember ? (mentionedmember.nickname || mentionedmember.user.username) : (message.member.nickname || message.author.username)}`)
                .setColor("Random")
                .setImage(gifselector)
                .setFooter({text: "Powered by KLIPY"});

            await message.reply({
                embeds: [embed],
            });
        } catch (error) {
            console.error(error);
        }
    },
};
