import { EmbedBuilder, PermissionsBitField } from 'discord.js'
import fetch from 'node-fetch'
import 'dotenv/config'

export const command = {
  name: 'hentai',
  description: "Permet d\'envoyer une image de hentai.",
  cooldown: 10,
  nsfw: true,
  clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
  async execute (message, args) {
    try {
      const res = await (await fetch('https://gallery.fluxpoint.dev/api/nsfw/gif/hentai', {
        headers: {
          Authorization: `${process.env.FLUXPOINT_API_KEY}`
        }
      }))?.json()
      if (!res?.file) return await message.reply("Impossible de récupérer l\'image")

      const embed = new EmbedBuilder()
        .setTitle(`Une image de hentai pour toi, ${message.member.nickname || message.author.username}`)
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
