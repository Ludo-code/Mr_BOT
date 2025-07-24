import { EmbedBuilder, PermissionsBitField } from "discord.js";
import fetch from "node-fetch";
import { getRedditToken } from "../../utils/redditTokenRenew.js";
import "dotenv/config";

export const command = {
    name: "goth_sfw",
    aliases: ["gothsfw", "goth_sfw", "goth-sfw"],
    description: "Envoie une image aléatoire de goth girl.",
    cooldown: 10,
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            const token = await getRedditToken();

            let res = await fetch("https://oauth.reddit.com/r/GothGirls/new.json?limit=50", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "User-Agent": `${process.env.REDDIT_USER_AGENT}`
                }
            });
            res = await res.json();
            if (!res?.data?.children || res.data.children.length === 0) return await message.reply("Impossible d'obtenir l'image");

            const allposts = res.data.children;

            function extractGalleryImages(post) {
                const mediaMetadata = post.data.media_metadata;
                if (!mediaMetadata) return [];
                return Object.values(mediaMetadata)
                    .map(meta => {
                        if (meta.e === "Image" && meta.s && meta.s.u) {
                            return meta.s.u.replace(/&amp;/g, "&");
                        }
                        return null;
                    })
                    .filter(Boolean);
            }

            let imageUrls = [];
            for (const post of allposts) {
                if (post.data.is_gallery && post.data.media_metadata) {
                    imageUrls.push(...extractGalleryImages(post));
                } else if (post.data.url && post.data.url.match(/\.(jpg|jpeg|png|gif)$/)) {
                    imageUrls.push(post.data.url);
                }
            }

            if (imageUrls.length === 0) return await message.reply("Impossible d'obtenir l'image");

            const randomizedpicture = imageUrls[Math.floor(Math.random() * imageUrls.length)];

            let embed = new EmbedBuilder()
                .setTitle(`Une image de goth girl pour toi, ${message.member.nickname || message.author.username}`)
                .setColor("Random")
                .setImage(randomizedpicture);

            await message.reply({
                embeds: [embed],
            });
        } catch (error) {
            console.error(error);
        }
    },
};
