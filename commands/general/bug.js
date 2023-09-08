import { AttachmentBuilder, Colors, EmbedBuilder } from "discord.js";
import config from "../../config.js";
const { ownerId } = config;

export const command = {
    name: 'bug',
    description: 'Report a bug! You can also upload files (optional).',
    usage: '<message>',
    args: true,
    cooldown: 10,
    async execute(message, args) {
        if (!args?.length) return;

        let msg = args.join(' ');
        let attachments = message.attachments.map(a => {
            return new AttachmentBuilder(a.url);
        })
   
        let owner;
        try {
            owner = await message.client.users.fetch(ownerId);
        } catch (error) {
            console.error(error);
        }

        if (!owner) return;

        let embed = new EmbedBuilder()
            .setTitle(`Bug report by ${message.author.username}`)
            .setDescription(msg)
            .addFields(
                {
                    name: 'User',
                    value: `> name: ${message.author.username}\n> ID: ${message.author.id}`
                }
            )
            .setThumbnail(message.author.displayAvatarURL({
                size: 1024,
                forceStatic: false,
                extension: 'png'
            }))
            .setColor(Colors.DarkPurple)
        try {
            await owner.send({
                embeds: [embed],
                files: attachments,
            });

            await message.reply('✅ Sent your bug report.')
        } catch (error) {
            console.error(error);
            await message.reply('❌ Could not send your bug report.')
        }
    },
};