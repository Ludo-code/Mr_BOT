import logger from "../../utils/logger.js";
import { Guild } from "../../schema/schema.js";
import { getTranslations } from "../../lang/index.js";

export const command = {
    name: "setlang",
    aliases: ["set-language", "lang"],
    description: "Set server language (admin only)",
    usage: "<fr|en>",
    staffOnly: true,
    async execute(message, args) {
        try {
            let [g] = await Guild.findOrCreate({ where: { guildId: message.guild.id } });
            const translations = getTranslations(g?.toJSON()?.language || 'fr');

            if (!args[0] || !["fr", "en"].includes(args[0].toLowerCase())) {
                return await message.reply(translations.messages.MISSING_ARGS.replace('{user}', `${message.author}`));
            }

            g.language = args[0].toLowerCase();
            await g.save();

            const newTranslations = getTranslations(g.language);
            await message.reply(newTranslations.messages.LANGUAGE_SET.replace('{lang}', g.language));
        } catch (error) {
            logger.error(error);
            message.reply("Unable to set language.");
        }
    },
};
