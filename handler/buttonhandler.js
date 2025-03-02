import { ChannelType, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js'
import { Guild, Ticket } from '../schema/schema.js'

const handleButton = async (interaction) => {
  if (!interaction.isButton()) return

  if (interaction.customId == 'ticketcreate') {
    try {
      await interaction.deferUpdate({
        fetchReply: true,
        ephemeral: true
      })

      const [g] = await Guild.findOrCreate({
        where: {
          guildId: interaction.guild.id
        }
      })

      const channelexists = await interaction.guild.channels.cache.find(c => c.name == `ticket_${interaction.user.id}`)

      if (channelexists) {
        return await interaction.followUp({
          content: `Un ticket a déjà été ouvert pour vous : ${channelexists}.`,
          ephemeral: true
        })
      }

      const parentTicketChannel = interaction.guild.channels.cache.get(g.ticketCategoryChannelID)

      const ticketchannel = await interaction.guild.channels.create({
        name: `ticket_${interaction.user.id}`,
        type: ChannelType.GuildText,
        ...(parentTicketChannel && { parent: parentTicketChannel?.id }),
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [PermissionFlagsBits.ViewChannel]
          },
          {
            id: interaction.guild.client?.user?.id,
            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks, PermissionFlagsBits.ReadMessageHistory]
          },
          {
            id: interaction.user.id,
            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.ReadMessageHistory]
          }
        ]
      })

      await Ticket.create({
        userId: interaction.user.id,
        guildId: interaction.guild.id,
        channelId: ticketchannel.id
      })

      await interaction.followUp({
        content: `Ticket créé pour vous (${ticketchannel}).`,
        ephemeral: true
      })
    } catch (error) {
      console.error(error)
    }
  }

  if (interaction.customId.startsWith('aide_')) {
    try {
      await interaction.deferUpdate()

      const [, action, currentPageStr] = interaction.customId.split('_')
      const currentPage = parseInt(currentPageStr, 10)

      const commands = Array.from(interaction.client.commands.values())
        .filter(cmd => !cmd.nsfw && typeof cmd.name === 'string')
        .sort((a, b) => a.name.localeCompare(b.name))

      const chunkSize = 10
      const totalCommands = commands.length
      const totalPages = Math.ceil(totalCommands / chunkSize)

      let newPage = currentPage
      if (action === 'first') newPage = 0
      else if (action === 'prev') newPage = Math.max(0, currentPage - 1)
      else if (action === 'next') newPage = Math.min(totalPages - 1, currentPage + 1)
      else if (action === 'last') newPage = totalPages - 1

      const start = newPage * chunkSize
      const end = start + chunkSize
      const pageCommands = commands.slice(start, end)
      const commandList = pageCommands
        .map(cmd => `» ${cmd.name} ‣ ${cmd.description || 'Aucune description.'}`)
        .join('\n')

      const updatedEmbed = new EmbedBuilder()
        .setTitle('Commandes')
        .setDescription(commandList)
        .setColor('Blue')
        .setFooter({ text: `Page: ${newPage + 1}/${totalPages}` })

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`aide_first_${newPage}_${totalPages}`)
          .setLabel('⏮️')
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(newPage === 0),
        new ButtonBuilder()
          .setCustomId(`aide_prev_${newPage}_${totalPages}`)
          .setLabel('◀️')
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(newPage === 0),
        new ButtonBuilder()
          .setCustomId(`aide_next_${newPage}_${totalPages}`)
          .setLabel('▶️')
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(newPage === totalPages - 1),
        new ButtonBuilder()
          .setCustomId(`aide_last_${newPage}_${totalPages}`)
          .setLabel('⏭️')
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(newPage === totalPages - 1)
      )

      await interaction.editReply({
        embeds: [updatedEmbed],
        components: [row]
      })
    } catch (error) {
      console.error(error)
      if (!interaction.deferred && !interaction.replied) {
        await interaction.reply({
          content: 'Une erreur est survenue lors de la manipulation de ce bouton.',
          ephemeral: true
        })
      }
    }
  }
}

export default handleButton
