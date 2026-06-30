import logger from "../../utils/logger.js";
import { PermissionsBitField } from "discord.js";
import { Guild } from "../../schema/schema.js";
import { getTranslations } from "../../lang/index.js";

export const command = {
    name: "efface",
    aliases: ["delete", "erase", "effacer", "éffacer", "clear"],
    description: "Supprime un certain nombre de messages !",
    usage: "<number>",
    args: true,
    staffOnly: true,
	clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ManageMessages],
    async execute(message, args) {
        let [g] = await Guild.findOrCreate({ where: { guildId: message.guild.id } });
        const translations = getTranslations(g?.toJSON()?.language || 'fr');

        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return message.reply(translations.messages.CLEAR_INVALID_NUMBER);
        } else if (amount < 1 || amount > 100) {
            return message.reply(translations.messages.CLEAR_RANGE_ERROR);
        }

        try {
            await message.channel.bulkDelete(amount);

            message.channel.send(translations.messages.CLEAR_SUCCESS.replace('{count}', `${amount - 1}`).replace('{user}', message.author.username))
                .then(msg => {
                    setTimeout(() => msg.delete(), 2000)
                })
                .catch(err => message.channel.send(err));
        } catch (error) {
            logger.error(error);
            message.channel.send(translations.messages.CLEAR_ERROR.replace('{error}', error.message));
        }
    },
};
