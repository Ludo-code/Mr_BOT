import { Colors, EmbedBuilder } from "discord.js";
import { Pagination } from 'pagination.djs';

export const command = {
    name: 'help-nsfw',
    description: 'Lists all the nsfw commands',
    async execute(message, args) {
        try {
            let commandName = args[0];
            const cmd = message.client.commands.get(commandName) ||
                message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
            if (cmd) {
                if (!cmd.nsfw) {
                    return await message.reply(`Please use **${prefix}help** command for non nsfw commands.`)
                }
                let descText = cmd.description ? cmd.description : '';
                descText += (
                    `\n\n**Nsfw: ** ${cmd.nsfw ? `true` : `false`}`
                    + `\n\n**Argument(s) requird: ** ${cmd.args ? `true` : `false`}`
                );

                let cmdembed = new EmbedBuilder()
                    .setTitle(cmd.name)
                    .setDescription(descText)
                    .setColor('Random');
                
                if (cmd.usage) cmdembed.addFields({
                    name: 'Usage',
                    value: `\`${prefix}${cmd.name} ${cmd.usage}\``
                });
                if (cmd.aliases?.length) cmdembed.addFields({
                    name: `Aliases`,
                    value: `\`${cmd.aliases.join('`, `')}\``
                });

                return await message.reply({
                    embeds: [cmdembed],
                })

            } else {
                let commands = message.client.commands.map(c => c).filter(c => c.nsfw && typeof c.name == 'string').sort((a, b) => a.name.localeCompare(b.name));
                let chunkSize = 10;
                let embeds = [];
                const pagination = new Pagination(message, {
                    idle: 60000,
                });

                for (let i = 0; i < commands.length; i += chunkSize) {
                    const chunk = commands.slice(i, i + chunkSize);
                    let txt = chunk.map(c => `» ${c.name} ‣ ${c.description}`).join('\n')
                    let embed = new EmbedBuilder()
                        .setTitle('Commands')
                        .setDescription(txt)
                        .setColor(Colors.Blue)
                        .setFooter({
                            text: `Page: ${embeds.length + 1}/${Math.ceil(commands.length / chunkSize)}`,
                        });


                    embeds.push(embed);
                }

                pagination.setEmbeds(embeds);

                pagination.render();
            }

        } catch (e) {
            console.error(e);
        }
    },
};