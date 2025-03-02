import { EmbedBuilder, PermissionsBitField } from 'discord.js'
import fetch from 'node-fetch'

export const command = {
  name: 'pleure',
  description: "Envoie une image de quelq'un qui pleure",
  cooldown: 10,
  clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
  async execute (message) {
    try {
      const res = await (await fetch('https://nekos.best/api/v2/cry'))?.json()
      if (!res?.results || !res?.results[0]?.url) return await message.reply("impossible de récupérer l'image")

      const mentionedmember = message.mentions.members.first()

      const embed = new EmbedBuilder()
        .setTitle(`${mentionedmember ? (mentionedmember.nickname || mentionedmember.user.username) : (message.member.nickname || message.author.username)} pleure !`)
        .setColor('Random')
        .setImage(res.results[0].url)

      await message.reply({
        embeds: [embed]
      })
    } catch (error) {
      console.error(error)
    }
  }
}
