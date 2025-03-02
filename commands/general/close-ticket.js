import { PermissionsBitField } from 'discord.js'
import { Ticket } from '../../schema/schema.js'

export const command = {
  name: 'fermer',
  aliases: ['fermeture'],
  description: 'Permet de fermer le ticket.',
  clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ManageChannels],
  async execute (message) {
    const t = await Ticket.findOne({
      where: {
        channelId: message.channel.id,
        guildId: message.guild.id
      }
    })

    if (!t || (message.author.id != t.toJSON()?.userId && !message.member.permissions.has(PermissionsBitField.Flags.Administrator))) {
      return await message.reply('Désolé! Ceci n"est pas votre canal de ticket. Veuillez exécuter cette commande dans votre canal de ticket pour fermer le ticket.')
    }

    if (t) await t.destroy().catch(e => console.log(e))
    await message.reply(`Fermeture du ticket et supression du salon <t:${Math.round(Date.now() / 1000 + 10)}:R>`)
    setTimeout(async () => {
      await message.channel.delete()
    }, 10 * 1000)
  }
}
