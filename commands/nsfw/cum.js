import { EmbedBuilder, PermissionsBitField } from "discord.js";
import fetch from "node-fetch";
import "dotenv/config";
import logger from "../../utils/logger.js";
import { Guild } from "../../schema/schema.js";
import { getTranslations } from "../../lang/index.js";

export const command = {
    name: "cum_gif",
    aliases: ["ejac_gif", "ejaculation_gif", "cumgif", "cum-gif", "ejac-gif", "ejacgif"],
    description: "Envoie une image de quelqu'un qui éjacule.",
    cooldown: 10,
    nsfw: true,
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            let [g] = await Guild.findOrCreate({ where: { guildId: message.guild.id } });
            const translations = getTranslations(g?.toJSON()?.language || 'fr');

            let res = await (await fetch("https://api.fluxpoint.dev/nsfw/gif/cum", {
  headers: {
    "Authorization": `${process.env.FLUXPOINT_API_KEY}`
  }
}))?.json();
            if (!res?.file) return await message.reply(translations.messages.CAN_NOT_FETCH_IMAGE);
           
            let mentionedmember = message.mentions.members.first();
            const displayName = mentionedmember ? (mentionedmember.nickname || mentionedmember.user.username) : (message.member.nickname || message.author.username);

            let embed = new EmbedBuilder()
                .setTitle(translations.messages.USER_IMAGE_TITLE.replace('{user}', displayName))
                .setColor("Random")
                .setImage(res.file);


            await message.reply({
                embeds: [embed],
            });
        } catch (error) {
            logger.error(error);
        }
    },
};
