import { EmbedBuilder, PermissionsBitField } from "discord.js";
import fetch from "node-fetch";
import "dotenv/config";

export const command = {
    name: "feet_humain",
    aliases: ["feet", "pieds"],
    description: "Envoie une image aléatoire de pieds.",
    cooldown: 10,
    nsfw: true,
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            let res = await (await fetch(`https://www.reddit.com/r/feet/hot.json?limit=50`))?.json();
            if (!res?.data?.children || res.data.children.length === 0) return await message.reply("Impossible d'obtenir l'image");

            const allposts = res?.data?.children;
            const fileterimagepost = allposts
                .map((post) => post.data.url)
                .filter(url => url.match(/\.(jpg|jpeg|png|gif)$/));
            
            if (fileterimagepost.length === 0) return await message.reply("Impossible d'obtenir l'image");

            let embed = new EmbedBuilder()
                .setTitle(`Une image de pied pour toi, ${message.member.nickname || message.author.username}`)
                .setColor("Random")
                .setImage(res.data.children[Math.floor(Math.random() * fileterimagepost.length)].data.url);

            await message.reply({
                embeds: [embed],
            });
        } catch (error) {
            console.error(error);
        }
    },
};
