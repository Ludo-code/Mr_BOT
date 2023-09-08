import { Guild } from "../../schema/schema.js";

export const command = {
    name: 'nsfw',
    description: 'Enable/disable nsfw commands!',
    args: true,
    usage: '<enable|disable>',
    staffOnly: true,
    async execute(message, args) {

        if (!args || !args[0] || !['enable', 'disable'].includes(args[0]?.toLowerCase())) {
            return await message.reply(`Please provide \`enable\` or \`disable\` as an argument.`)
        }

        let [g] = await Guild.findOrCreate({
            where: {
                guildId: message.guild.id,
            }
        });

        g.nsfwEnabled = args[0].toLowerCase() == 'enable' ? true : false;
        await g.save();

        await message.reply(`Nsfw ${args[0]}d in this server.`);
    },
};