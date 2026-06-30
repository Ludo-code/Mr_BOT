import { EmbedBuilder, PermissionsBitField } from "discord.js";
import fetch from "node-fetch";
import logger from "../../utils/logger.js";
import { Guild } from "../../schema/schema.js";
import { getTranslations } from "../../lang/index.js";

export const command = {
    name: "panda",
    description: "Envoie une image de Panda aléatoire.",
    cooldown: 10,
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            let [g] = await Guild.findOrCreate({ where: { guildId: message.guild.id } });
            const translations = getTranslations(g?.toJSON()?.language || 'fr');

            let res = await (await fetch("https://some-random-api.com/img/panda"))?.json();
            if (!res?.link) return await message.reply(translations.messages.CAN_NOT_FETCH_IMAGE);
            
            const displayName = message.member.nickname || message.author.username;

            let embed = new EmbedBuilder()
                .setTitle(translations.messages.USER_IMAGE_TITLE.replace('{user}', displayName))
                .setColor("Random")
                .setImage(res.link);

            await message.reply({
                embeds: [embed],
            });
        } catch (error) {
            logger.error(error);
        }
    },
};
