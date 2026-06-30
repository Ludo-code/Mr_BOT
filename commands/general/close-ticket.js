import { EmbedBuilder, PermissionsBitField } from "discord.js";
import { Ticket } from "../../schema/schema.js";
import logger from "../../utils/logger.js";
import { Guild } from "../../schema/schema.js";
import { getTranslations } from "../../lang/index.js";

export const command = {
    name: "fermer",
    aliases: ["fermeture"],
    description: "Permet de fermer le ticket.",
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ManageChannels],
    async execute(message, args) {
        let [g] = await Guild.findOrCreate({ where: { guildId: message.guild.id } });
        const translations = getTranslations(g?.toJSON()?.language || 'fr');

        let t = await Ticket.findOne({
            where: {
                channelId: message.channel.id,
                guildId: message.guild.id,
            }
        });

        if (!t || (message.author.id != t.toJSON()?.userId && !message.member.permissions.has(PermissionsBitField.Flags.Administrator))) {
            return await message.reply(translations.messages.TICKET_NOT_OWNER);
        }

        if (t) await t.destroy().catch(e => logger.error(e));
        await message.reply(translations.messages.TICKET_CLOSING.replace('{time}', Math.round(Date.now() / 1000 + 10)))
        setTimeout(async () => {
            await message.channel.delete();
        }, 10 * 1000);
    },
};
