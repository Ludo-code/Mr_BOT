import { PermissionsBitField } from 'discord.js'

export const command = {
  name: 'efface',
  aliases: ['delete', 'erase', 'effacer', 'éffacer', 'clear'],
  description: 'Supprime un certain nombre de messages !',
  usage: '<number>',
  args: true,
  staffOnly: true,
  clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ManageMessages],
  async execute (message, args) {
    const amount = parseInt(args[0]) + 1

    if (isNaN(amount)) {
      return message.reply('La valeur mise ne ressemble pas à un nombre.')
    } else if (amount < 1 || amount > 100) {
      return message.reply("Vous avez besoin d'entrer un nombre entre 1 et 100. Si vous souhaitez supprimer tout les messages `efface_complet` permet de le faire.")
    }

    try {
      await message.channel.bulkDelete(amount)

      message.channel.send(`Supression de ${amount - 1} messages. Demandé par ${message.author.username}`)
        .then(msg => {
          setTimeout(() => msg.delete(), 2000)
        })
        .catch(err => message.channel.send(err))
    } catch (error) {
      console.error(error)
      message.channel.send(`Impossible de supprimer les messages ! Utiliser \`efface_complet\` à la place si vous souhaitez suprrimer tout les messages.\n\`Erreur : ${error.message}\``)
    }
  }
}
