import { EmbedBuilder, PermissionsBitField } from 'discord.js'
import fetch from 'node-fetch'

export const command = {
  name: 'fox_girl',
  aliases: ['foxgirl', 'fox-girl'],
  description: 'Envoie une image de fox girl aléatoire',
  cooldown: 10,
  clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
  async execute (message, args) {
    try {
      const res = await (await fetch('https://nekos.life/api/v2/img/fox_girl'))?.json()
      if (!res?.url) return await message.reply("Impossible de récupérer l\'image")

      const embed = new EmbedBuilder()
        .setTitle(`Une image de fox girl pour toi, ${message.member.nickname || message.author.username}`)
        .setColor('Random')
        .setImage(res.url)

      await message.reply({
        embeds: [embed]
      })
    } catch (error) {
      console.error(error)
    }
  }
}
