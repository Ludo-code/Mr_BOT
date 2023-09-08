import { ChannelType, EmbedBuilder } from "discord.js";

export const command = {
    name: 'avatar',
    description: 'Check the user avatar',
    async execute(message, args) {
        try {
            let member = message.mentions.members.first() || message.member;

            let embed = new EmbedBuilder()
                .setTitle(`${member.nickname || member.user.username}'s avatar`)
                .setImage(member.user.displayAvatarURL({
                    size: 2048,
                    extension: 'png',
                    forceStatic: false
                }))
                .setFooter({
                    text: `Requested by: @${message.author.username} [${message.author.id}]`
                });

            await message.reply({
                embeds: [embed],
            })
        } catch (error) {
            console.error(error);
        }
    },
};