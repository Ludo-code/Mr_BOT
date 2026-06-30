import logger from "../../utils/logger.js";
import { EmbedBuilder, PermissionsBitField } from "discord.js";
import fetch from "node-fetch";
import "dotenv/config";
import { Guild } from "../../schema/schema.js";
import { getTranslations } from "../../lang/index.js";

export const command = {
    name: "bonne_nuit",
    aliases: ["bonnenuit", "bonne-nuit"],
    description: "Envoie une image aléatoire de Bonne Nuit.",
    cooldown: 10,
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            let [g] = await Guild.findOrCreate({ where: { guildId: message.guild.id } });
            const translations = getTranslations(g?.toJSON()?.language || 'fr');

            let res = await (await fetch(`https://api.klipy.com/api/v1/${process.env.KLIPY_API_KEY}/gifs/search?customer_id=${process.env.KLIPY_API_KEY_NAME}&limit=50&q=good night anime`))?.json();
            if (!res?.data?.data || !res.data.data[0]?.file) return await message.reply(translations.messages.CAN_NOT_FETCH_IMAGE);

            const randomizeresults = Math.floor(Math.random() * res.data.data.length);
            let gifselector = res.data.data[randomizeresults]?.file?.hd?.gif?.url || res.data.data[randomizeresults]?.file?.md?.gif?.url || res.data.data[randomizeresults]?.file?.sm?.gif?.url || res.data.data[randomizeresults]?.file?.xs?.gif?.url;

            let mentionedmember = message.mentions.members.first();
            const displayName = mentionedmember ? (mentionedmember.nickname || mentionedmember.user.username) : (message.member.nickname || message.author.username);

            let embed = new EmbedBuilder()
                .setTitle(translations.messages.GOOD_NIGHT_TITLE.replace('{user}', displayName))
                .setColor("Random")
                .setImage(gifselector)
                .setFooter({text: translations.messages.POWERED_BY.replace('{service}', 'KLIPY')});

            await message.reply({
                embeds: [embed],
            });
        } catch (error) {
            logger.error(error);
        }
    },
};
