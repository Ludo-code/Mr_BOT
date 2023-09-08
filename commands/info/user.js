import { ChannelType, EmbedBuilder } from "discord.js";

export const command = {
    name: 'user',
    aliases: ['userinfo'],
    description: 'Check the user info',
    async execute(message, args) {
        try {
            let member = message.mentions.members.first() || message.member;

            let embed = new EmbedBuilder()
                .setDescription(`**${member.nickname || member.user.username}** - <@${member.user.id}> [**${member.user.id}**]`)
                .setColor('Random')
                .addFields(
                    {
                        name: 'Created',
                        value: `- <t:${Math.round(member.user.createdTimestamp / 1000)}:f>\n- <t:${Math.round(member.user.createdTimestamp / 1000)}:R>`,
                        inline: true
                    },
                    {
                        name: 'Joined',
                        value: `- <t:${Math.round(member.joinedTimestamp / 1000)}:f>\n- <t:${Math.round(member.joinedTimestamp / 1000)}:R>`,
                        inline: true
                    },
                    {
                        name: 'Info',
                        value: `- Username: **${member.user.username}**\n- Nickname: **${member.nickname || 'None'}**\n- Tag: **${member.user.tag}**\nID: **${member.user.id}**`,
                    },
                )
                .setThumbnail(member.user.displayAvatarURL({
                    size: 1024,
                    extension: 'png',
                    forceStatic: false
                }))
                .setFooter({
                    text: `Requested by: @${message.author.username} [${message.author.id}]`
                })
                .setTimestamp();

            await message.reply({
                embeds: [embed],
            })
        } catch (error) {
            console.error(error);
        }
    },
};