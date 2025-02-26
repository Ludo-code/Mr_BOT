import { EmbedBuilder, PermissionsBitField } from 'discord.js'
import fetch from 'node-fetch'

export const command = {
  name: 'bonjour',
  aliases: ['salut', 'bonsoir'],
  description: "Permet d\'envoyer une image d\'une personne qui salut.",
  cooldown: 10,
  clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
  async execute (message, args) {
    try {
      const res = await (await fetch('https://nekos.best/api/v2/wave'))?.json()
      if (!res?.results[0].url) return await message.reply("Impossible de récupérer l\'image")

      const embed = new EmbedBuilder()
        .setTitle(`${message.member.nickname || message.author.username} salut tout le monde.`)
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
