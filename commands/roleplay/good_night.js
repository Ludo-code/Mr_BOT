import { EmbedBuilder, PermissionsBitField } from 'discord.js'
import fetch from 'node-fetch'
import 'dotenv/config'

export const command = {
  name: 'bonne_nuit',
  aliases: ['bonnenuit', 'bonne-nuit'],
  description: 'Envoie une image aléatoire de Bonne Nuit.',
  cooldown: 10,
  clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
  async execute (message, args) {
    try {
      const res = await (await fetch(`https://g.tenor.com/v1/random?id=8776030&key=${process.env.TENOR_API_KEY}&limit=1&q=good+night+anime`))?.json()
      if (!res?.results || !res.results[0]?.media || !res.results[0]?.media[0]?.gif?.url) return await message.reply('Impossible d\obtenir l\image')

      const mentionedmember = message.mentions.members.first()

      const embed = new EmbedBuilder()
        .setTitle(`Bonne Nuit, ${mentionedmember ? (mentionedmember.nickname || mentionedmember.user.username) : (message.member.nickname || message.author.username)}`)
        .setColor('Random')
        .setImage(res.results[0]?.media[0]?.gif?.url)

      await message.reply({
        embeds: [embed]
      })
    } catch (error) {
      console.error(error)
    }
  }
}
