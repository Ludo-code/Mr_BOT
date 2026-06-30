import { EmbedBuilder, PermissionsBitField } from "discord.js";
import fetch from "node-fetch";
import logger from "../../utils/logger.js";
import { Guild } from "../../schema/schema.js";
import { getTranslations } from "../../lang/index.js";

export const command = {
    name: "pleure",
    aliases: ["cry", "crying"],
    description: "Envoie une image de quelq'un qui pleure",
    cooldown: 10,
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            let [g] = await Guild.findOrCreate({ where: { guildId: message.guild.id } });
            const translations = getTranslations(g?.toJSON()?.language || 'fr');

            let res = await (await fetch("https://nekos.best/api/v2/cry"))?.json();
            if (!res?.results || !res?.results[0]?.url) return await message.reply(translations.messages.CAN_NOT_FETCH_IMAGE);

            let mentionedmember = message.mentions.members.first();
            const displayName = mentionedmember ? (mentionedmember.nickname || mentionedmember.user.username) : (message.member.nickname || message.author.username);

            let embed = new EmbedBuilder()
                .setTitle(translations.messages.USER_IMAGE_TITLE.replace('{user}', displayName))
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
