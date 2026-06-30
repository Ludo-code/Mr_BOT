import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, EmbedBuilder } from "discord.js";
import logger from "../../utils/logger.js";
import { Guild } from "../../schema/schema.js";
import { getTranslations } from "../../lang/index.js";

export const command = {
    name: "aide_nsfw",
    aliases: ["help-nsfw", "help_nsfw"],
    description: "Affiche les commandes NSFW",
    async execute(message, args) {
        try {
            let [g] = await Guild.findOrCreate({ where: { guildId: message.guild.id } });
            const translations = getTranslations(g?.toJSON()?.language || 'fr');

            let commandName = args[0];
            const cmd = message.client.commands.get(commandName) ||
                message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

            if (cmd) {
                if (!cmd.nsfw) {
                    return await message.reply(translations.messages.USE_HELP_FOR_NON_NSFW.replace('{prefix}', require('../../config.js').default.prefix))
                }

                let descText = cmd.description ? cmd.description : "";
                descText += (
                    `\n\n**Nsfw : ** ${cmd.nsfw ? `\`actif\`` : `\`inactif\``}`
                    + `\n**Argument(s) requis : ** ${cmd.args ? `\`actif\`` : `\`inactif\``}\n`
                );

                let cmdembed = new EmbedBuilder()
                    .setTitle(cmd.name)
                    .setDescription(descText)
                    .setColor("Random");

                if (cmd.usage) cmdembed.addFields({
                    name: translations.messages.USAGE_LABEL,
                    value: `\`${require('../../config.js').default.prefix}${cmd.name} ${cmd.usage}\``
                });
                if (cmd.aliases?.length) cmdembed.addFields({
                    name: translations.messages.ALIASES_LABEL,
                    value: `\`${cmd.aliases.join("`, `")}\``
                });

                return await message.reply({ embeds: [cmdembed] });
            } else {
                let commands = message.client.commands.map(c => c).filter(c => c.nsfw && typeof c.name === "string").sort((a, b) => a.name.localeCompare(b.name));
                const chunkSize = 10;
                const embeds = [];

                for (let i = 0; i < commands.length; i += chunkSize) {
                    const chunk = commands.slice(i, i + chunkSize);
                    const txt = chunk.map(c => `» ${c.name} ‣ ${c.description}`).join("\n");
                    const embed = new EmbedBuilder()
                        .setTitle(translations.messages.NSFW_COMMANDS_TITLE)
                        .setDescription(txt)
                        .setColor(Colors.Blue)
                        .setFooter({ text: translations.messages.PAGE_FOOTER.replace('{current}', `${embeds.length + 1}`).replace('{total}', `${Math.ceil(commands.length / chunkSize)}`) });

                    embeds.push(embed);
                }

                const currentPage = 0;
                const userId = message.author.id;

                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`aide_nsfw_first_${currentPage}_${embeds.length}_${userId}`)
                        .setLabel("⏮️")
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(currentPage === 0),
                    new ButtonBuilder()
                        .setCustomId(`aide_nsfw_prev_${currentPage}_${embeds.length}_${userId}`)
                        .setLabel("◀️")
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(currentPage === 0),
                    new ButtonBuilder()
                        .setCustomId(`aide_nsfw_next_${currentPage}_${embeds.length}_${userId}`)
                        .setLabel("▶️")
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(currentPage === embeds.length - 1),
                    new ButtonBuilder()
                        .setCustomId(`aide_nsfw_last_${currentPage}_${embeds.length}_${userId}`)
                        .setLabel("⏭️")
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(currentPage === embeds.length - 1)
                );

                await message.reply({
                    embeds: [embeds[currentPage]],
                    components: [row],
                });
            }
        } catch (e) {
            logger.error(e);
        }
    },
};
