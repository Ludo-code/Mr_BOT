import logger from "../../utils/logger.js";
import { PermissionsBitField } from "discord.js";
import { Guild } from "../../schema/schema.js";
import { getTranslations } from "../../lang/index.js";

export const command = {
    name: "efface_complet",
    aliases: ["erase_complete", "clear_complete", "clear_complete"],
    description: "Supprime la totalité des messages du salon.",
    staffOnly: true,
	clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ManageChannels],
    async execute(message, args) {
        let [g] = await Guild.findOrCreate({ where: { guildId: message.guild.id } });
        const translations = getTranslations(g?.toJSON()?.language || 'fr');
        try {
            await message.channel.send(translations.messages.DELETE_COMPLETE_NOTIFY.replace('{time}', Math.round(Date.now() / 1000 + 15)));
            setTimeout(async () => {
                let clonedChannel = await message.channel.clone();
                const originalPosition = message.channel.position;
                await message.channel.delete().catch(() => null);
                await clonedChannel.setPosition(originalPosition);
            }, 15000);
        } catch (error) {
            logger.error(error);
            await message.channel.send(translations.messages.DELETE_COMPLETE_ERROR.replace('{error}', error.message));
        }
    },
};
