import { AttachmentBuilder, Colors, EmbedBuilder, PermissionsBitField } from 'discord.js'
import config from '../../config.js'
const { ownerId } = config

export const command = {
  name: 'idee',
  aliases: ['idée'],
  description: 'Permet de rapporter une idée. Il est possible de joindre un fichier ou plusieurs.',
  usage: '<message>',
  args: true,
  cooldown: 43200,
  clientpermissions: [PermissionsBitField.Flags.SendMessages],
  async execute (message, args) {
    if (!args?.length) return

    const msg = args.join(' ')
    const attachments = message.attachments.map(a => {
      return new AttachmentBuilder(a.url)
    })

    let owner
    try {
      owner = await message.client.users.fetch(ownerId)
    } catch (error) {
      console.error(error)
    }

    if (!owner) return

    const embed = new EmbedBuilder()
      .setTitle(`Idée de ${message.author.username}`)
      .setDescription(msg)
      .addFields(
        {
          name: 'Utilisateur',
          value: `> nom : ${message.author.username}\n> ID: ${message.author.id}`
        }
      )
      .setThumbnail(message.author.displayAvatarURL({
        size: 1024,
        forceStatic: false,
        extension: 'png'
      }))
      .setColor(Colors.Yellow)
    try {
      await owner.send({
        embeds: [embed],
        files: attachments
      })

      await message.reply("✅ L\'idée à bien été envoyé.")
    } catch (error) {
      console.error(error)
      await message.reply("❌ Impossible d\'envoyer l\'idée.")
    }
  }
}
