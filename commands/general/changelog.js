import { PermissionsBitField } from 'discord.js'
import changelogs from '../../changelogs.js'

export const command = {
  name: 'changelog',
  description: "Permet d\'afficher le journal des changements",
  clientpermissions: [PermissionsBitField.Flags.SendMessages],
  async execute (message, args) {
    if (!changelogs?.length) return await message.reply("Il n'y a pas de changelog pour le moment")
    const text = changelogs.map(c => `\`\`\`\n${c}\n\`\`\``).join('\n')
    await message.reply(`# Changelogs\n${text}`)
  }
}
