import { EmbedBuilder, PermissionsBitField } from 'discord.js'
import fetch from 'node-fetch'
import 'dotenv/config'

export const command = {
  name: 'yaoi',
  description: "Envoie une image de quelqu'un qui se fait baiser pas un homme.",
  cooldown: 10,
  nsfw: true,
  clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
  async execute (message) {
    try {
      const res = await (await fetch('https://gallery.fluxpoint.dev/api/nsfw/img/yaoi', {
        headers: {
          Authorization: `${process.env.FLUXPOINT_API_KEY}`
        }
      }))?.json()
      if (!res?.file) return await message.reply("Impossible de récupérer l'image.")

      const mentionedmember = message.mentions.members.first()

      const embed = new EmbedBuilder()
        .setTitle(`${mentionedmember ? (mentionedmember.nickname || mentionedmember.user.username) : (message.member.nickname || message.author.username)} se fais baiser.`)
        .setColor('Random')
        .setImage(res.file)

      await message.reply({
        embeds: [embed]
      })
    } catch (error) {
      console.error(error)
    }
  }
}
