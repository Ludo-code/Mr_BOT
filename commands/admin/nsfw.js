import { PermissionsBitField } from 'discord.js'
import { Guild } from '../../schema/schema.js'

export const command = {
  name: 'nsfw',
  description: 'Active/Désactive les commande NSFW sur un serveur !',
  args: true,
  usage: '<actif|inactif>',
  staffOnly: true,
  clientpermissions: [PermissionsBitField.Flags.SendMessages],
  async execute (message, args) {
    if (!args || !args[0] || !['actif', 'inactif'].includes(args[0]?.toLowerCase())) {
      return await message.reply('Merci de dire soit `actif` ou `inactif` dans la commande.')
    }

    const [g] = await Guild.findOrCreate({
      where: {
        guildId: message.guild.id
      }
    })

    g.nsfwEnabled = args[0].toLowerCase() == 'actif'
    await g.save()

    await message.reply(`Le NSFW est ${args[0]} sur ce serveur.`)
  }
}
