import { ChannelType, EmbedBuilder, PermissionsBitField } from "discord.js";
import logger from "../../utils/logger.js";

export const command = {
    name: "info-utilisateur",
    aliases: ["userinfo", "infoutilisateur", "info_utilisateur"],
    description: "Voir les informations de l'utilisateur",
    clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
    async execute(message, args) {
        try {
            let member = message.mentions.members.first() || message.member;

            let embed = new EmbedBuilder()
                .setDescription(`**${member.nickname || member.user.username}** - <@${member.user.id}> [**${member.user.id}**]`)
                .setColor("Random")
                .addFields(
                    {
                        name: "Date de Création du compte",
                        value: `- <t:${Math.round(member.user.createdTimestamp / 1000)}:f>\n- <t:${Math.round(member.user.createdTimestamp / 1000)}:R>`,
                        inline: true
                    },
                    {
                        name: "Date à laquel il à rejoint le serveur",
                        value: `- <t:${Math.round(member.joinedTimestamp / 1000)}:f>\n- <t:${Math.round(member.joinedTimestamp / 1000)}:R>`,
                        inline: true
                    },
                    {
                        name: "Info",
                        value: `- Nom d'utilisateur : **${member.user.username}**\n- Pseudonyme : **${member.nickname || "Aucun"}**\n- Tag : **${member.user.tag}**\nID: **${member.user.id}**`,
                    },
                )
                .setThumbnail(member.user.displayAvatarURL({
                    size: 1024,
                    extension: "png",
                    forceStatic: false
                }))
                .setFooter({
                    text: `Demandé par : @${message.author.username} [${message.author.id}]`
                })
                .setTimestamp();

            await message.reply({
                embeds: [embed],
            })
        } catch (error) {
            logger.error(error);
        }
    },
};
