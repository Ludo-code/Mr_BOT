import { Colors, EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
import config from '../../config.js'

const { prefix } = config

export const command = {
  name: 'aide_nsfw',
  aliases: ['aide-nsfw', 'help-nsfw'],
  description: "Affiche l\'aide des commandes nsfw.",
  nsfw: true,
  clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks],
  async execute (message, args) {
    try {
      const commandName = args[0]
      const cmd = message.client.commands.get(commandName) ||
                message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

      if (cmd) {
        if (!cmd.nsfw) {
          return await message.reply(`Merci d"utiliser **${prefix}aide** pour les commandes non nsfw.`)
        }

        let descText = cmd.description ? cmd.description : ''
        descText += (
                    `\n\n**Nsfw : ** ${cmd.nsfw ? '`actif`' : '`inactif`'}` +
                    `\n**Argument(s) requis : ** ${cmd.args ? '`actif`' : '`inactif`'}\n`
        )

        const cmdembed = new EmbedBuilder()
          .setTitle(cmd.name)
          .setDescription(descText)
          .setColor('Random')

        if (cmd.usage) {
          cmdembed.addFields({
            name: 'Utilisation',
            value: `\`${prefix}${cmd.name} ${cmd.usage}\``
          })
        }
        if (cmd.aliases?.length) {
          cmdembed.addFields({
            name: 'Alias',
            value: `\`${cmd.aliases.join('`, `')}\``
          })
        }

        return await message.reply({ embeds: [cmdembed] })
      } else {
        const commands = message.client.commands.map(c => c).filter(c => c.nsfw && typeof c.name === 'string').sort((a, b) => a.name.localeCompare(b.name))
        const chunkSize = 10
        const embeds = []

        for (let i = 0; i < commands.length; i += chunkSize) {
          const chunk = commands.slice(i, i + chunkSize)
          const txt = chunk.map(c => `» ${c.name} ‣ ${c.description}`).join('\n')
          const embed = new EmbedBuilder()
            .setTitle('Commandes')
            .setDescription(txt)
            .setColor(Colors.Blue)
            .setFooter({
              text: `Page: ${embeds.length + 1}/${Math.ceil(commands.length / chunkSize)}`
            })

          embeds.push(embed)
        }

        let currentPage = 0

        const replyMessage = await message.reply({
          embeds: [embeds[currentPage]],
          components: [
            new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setCustomId('first')
                .setLabel('⏮️')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(currentPage === 0),
              new ButtonBuilder()
                .setCustomId('prev')
                .setLabel('◀️')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(currentPage === 0),
              new ButtonBuilder()
                .setCustomId('next')
                .setLabel('▶️')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(currentPage === embeds.length - 1),
              new ButtonBuilder()
                .setCustomId('last')
                .setLabel('⏭️')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(currentPage === embeds.length - 1)
            )
          ]
        })

        const filter = (interaction) => interaction.user.id === message.author.id

        const collector = replyMessage.createMessageComponentCollector({ filter, time: 60000 })

        collector.on('collect', async (interaction) => {
          if (interaction.customId === 'prev') {
            currentPage--
          } else if (interaction.customId === 'next') {
            currentPage++
          } else if (interaction.customId === 'first') {
            currentPage = 0
          } else if (interaction.customId === 'last') {
            currentPage = embeds.length - 1
          }

          await interaction.update({
            embeds: [embeds[currentPage]],
            components: [
              new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                  .setCustomId('first')
                  .setLabel('⏮️')
                  .setStyle(ButtonStyle.Secondary)
                  .setDisabled(currentPage === 0),
                new ButtonBuilder()
                  .setCustomId('prev')
                  .setLabel('◀️')
                  .setStyle(ButtonStyle.Secondary)
                  .setDisabled(currentPage === 0),
                new ButtonBuilder()
                  .setCustomId('next')
                  .setLabel('▶️')
                  .setStyle(ButtonStyle.Secondary)
                  .setDisabled(currentPage === embeds.length - 1),
                new ButtonBuilder()
                  .setCustomId('last')
                  .setLabel('⏭️')
                  .setStyle(ButtonStyle.Secondary)
                  .setDisabled(currentPage === embeds.length - 1)
              )
            ]
          })
        })

        collector.on('end', async () => {
          await replyMessage.edit({ components: [] })
        })
      }
    } catch (e) {
      console.error(e)
    }
  }
}
