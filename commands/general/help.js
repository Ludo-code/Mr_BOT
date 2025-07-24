import { Colors, EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import config from "../../config.js";

const { prefix } = config;

export const command = {
    name: "aide",
    aliases: ["help"],
    description: "Affiche la liste de toutes les commandes",
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            let commandName = args[0];
            const cmd = message.client.commands.get(commandName) ||
                message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

            if (cmd) {
                if (cmd.nsfw) {
                    return await message.reply(`Merci d'utiliser **${prefix}aide-nsfw** pour obtenir la liste des commandes nsfw.`);
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
                    name: "Utilisation",
                    value: `\`${prefix}${cmd.name} ${cmd.usage}\``
                });
                if (cmd.aliases?.length) cmdembed.addFields({
                    name: `Alias`,
                    value: `\`${cmd.aliases.join("`, `")}\``
                });

                return await message.reply({ embeds: [cmdembed] });
            } else {
                let commands = message.client.commands.map(c => c).filter(c => !c.nsfw && typeof c.name === "string").sort((a, b) => a.name.localeCompare(b.name));
                const chunkSize = 10;
                const embeds = [];

                for (let i = 0; i < commands.length; i += chunkSize) {
                    const chunk = commands.slice(i, i + chunkSize);
                    const txt = chunk.map(c => `» ${c.name} ‣ ${c.description}`).join("\n");
                    const embed = new EmbedBuilder()
                        .setTitle("Commandes")
                        .setDescription(txt)
                        .setColor(Colors.Blue)
                        .setFooter({ text: `Page: ${embeds.length + 1}/${Math.ceil(commands.length / chunkSize)}` });

                    embeds.push(embed);
                }

                const currentPage = 0;
                const userId = message.author.id;

                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`aide_first_${currentPage}_${embeds.length}_${userId}`)
                        .setLabel("⏮️")
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(currentPage === 0),
                    new ButtonBuilder()
                        .setCustomId(`aide_prev_${currentPage}_${embeds.length}_${userId}`)
                        .setLabel("◀️")
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(currentPage === 0),
                    new ButtonBuilder()
                        .setCustomId(`aide_next_${currentPage}_${embeds.length}_${userId}`)
                        .setLabel("▶️")
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(currentPage === embeds.length - 1),
                    new ButtonBuilder()
                        .setCustomId(`aide_last_${currentPage}_${embeds.length}_${userId}`)
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
            console.error(e);
        }
    },
};
