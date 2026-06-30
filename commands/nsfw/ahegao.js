import { EmbedBuilder, PermissionsBitField } from "discord.js";
import fetch from "node-fetch";
import "dotenv/config";
import logger from "../../utils/logger.js";

export const command = {
    name: "ahegao",
    description: "Envoie une image aléatoire d'ahegao'.",
    cooldown: 10,
    nsfw: true,
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            let res = await (await fetch(`https://api.klipy.com/api/v1/${process.env.KLIPY_API_KEY}/gifs/search?customer_id=${process.env.KLIPY_API_KEY_NAME}&limit=50&q=ahegao`))?.json();
            if (!res?.data?.data || !res.data.data[0]?.file) return await message.reply("Impossible d'obtenir l'image");

            const randomizeresults = Math.floor(Math.random() * res.data.data.length);
            let gifselector = res.data.data[randomizeresults]?.file?.hd?.gif?.url || res.data.data[randomizeresults]?.file?.md?.gif?.url || res.data.data[randomizeresults]?.file?.sm?.gif?.url || res.data.data[randomizeresults]?.file?.xs?.gif?.url;

            let embed = new EmbedBuilder()
                .setTitle(`Une image d'ahegao pour toi, ${message.member.nickname || message.author.username}`)
                .setColor("Random")
                .setImage(gifselector)
                .setFooter({text: "Powered by KLIPY"});

            await message.reply({
                embeds: [embed],
            });
        } catch (error) {
            logger.error(error);
        }
    },
};
