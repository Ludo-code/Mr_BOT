import { EmbedBuilder, PermissionsBitField } from 'discord.js'

export const command = {
  name: 'avatar',
  description: "Permet de récupérer l'avatar d'une personne",
  clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
  async execute (message) {
    try {
      const member = message.mentions.members.first() || message.member

      const embed = new EmbedBuilder()
        .setTitle(`L'avatar de ${member.nickname || member.user.username}`)
        .setImage(member.user.displayAvatarURL({
          size: 2048,
          extension: 'png',
          forceStatic: false
        }))
        .setFooter({
          text: `Demandé par : @${message.author.username} [${message.author.id}]`
        })

      await message.reply({
        embeds: [embed]
      })
    } catch (error) {
      console.error(error)
    }
  }
}
