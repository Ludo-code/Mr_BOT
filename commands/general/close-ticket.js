import { EmbedBuilder, PermissionsBitField } from "discord.js";
import { Ticket } from "../../schema/schema.js";

export const command = {
    name: 'close-ticket',
    description: 'Close the ticket.',
    async execute(message, args) {
        let t = await Ticket.findOne({
            where: {
                channelId: message.channel.id,
                guildId: message.guild.id,
            }
        });

        if (!t || (message.author.id != t.toJSON()?.userId && !message.member.permissions.has(PermissionsBitField.Flags.Administrator))) {
            return await message.reply(`Sorry! This is not your ticket channel. Please run this command in your ticket channel to close the ticket.`);
        }

        if (t) await t.destroy().catch(e => console.log(e));
        await message.reply(`Closing the ticket and deleting this channel <t:${Math.round(Date.now() / 1000 + 10)}:R>`)
        setTimeout(async () => {
            await message.channel.delete();
        }, 10 * 1000);
    },
};