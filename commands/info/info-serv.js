import { ChannelType, EmbedBuilder } from "discord.js";

export const command = {
    name: 'info-serv',
    aliases: ['serverinfo'],
    description: 'Check the server info',
    async execute(message, args) {
        try {
            let guild = message.guild;

            let memberscached = message.client.membersCachedInServer.get(guild.id);
            if (!memberscached) {
                await guild.members.fetch();
                message.client.membersCachedInServer.set(guild.id, true);
            }

            let botsCount = guild.members.cache.map(m => m).filter(m => m.user.bot).length;
            let channels = guild.channels.cache.map(m => m);
            let textChannels = channels.filter(c => c.type == ChannelType.GuildText).length;
            let voiceChannels = channels.filter(c => c.type == ChannelType.GuildVoice).length;
            let announcementChannels = channels.filter(c => c.type == ChannelType.GuildAnnouncement).length;
            let forumChannels = channels.filter(c => c.type == ChannelType.GuildForum).length;
            let stageChannels = channels.filter(c => c.type == ChannelType.GuildStageVoice).length;

            let embed = new EmbedBuilder()
                .setTitle(`${guild.name} [${guild.id}]`)
                .setColor('Random')
                .addFields(
                    {
                        name: 'Members',
                        value: `- **${guild.memberCount}** members\n  - **${botsCount}** bots\n  - **${guild.memberCount - botsCount}** non-bot users\n- Owner: **${guild.members.cache.get(guild.ownerId).user.username}** (ID: **${guild.ownerId}**)`,
                        inline: true
                    },
                    {
                        name: 'Channels',
                        value: `- **${textChannels}** Text, **${voiceChannels}** Voice, **${announcementChannels}** Announcement, **${forumChannels}** Forum, **${stageChannels}** Stage\n- System channel: ${guild.systemChannelId ? `<#${guild.systemChannelId}>` : '**None**'}\n- AFK channel: ${guild.afkChannelId ? `<#${guild.afkChannelId}>` : '**None**'}`,
                        inline: true
                    },
                    {
                        name: 'Others',
                        value: `- Created: <t:${Math.round(guild.createdTimestamp / 1000)}:R>\n- Roles: **${guild.roles.cache.map(r => r).filter(r => r.id != guild.id).length}**\n- Emojis: **${guild.emojis.cache.size}**`,
                    }
                )
                .setFooter({
                    text: `Requested by: @${message.author.username} [${message.author.id}]`
                })
                .setTimestamp();

            if (message.guild.icon) embed.setThumbnail(message.guild.iconURL({
                size: 1024,
                extension: 'png',
                forceStatic: false
            }))

            await message.reply({
                embeds: [embed],
            })
        } catch (error) {
            console.error(error);
        }
    },
};