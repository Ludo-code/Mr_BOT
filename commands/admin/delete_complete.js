import { PermissionsBitField } from "discord.js";

export const command = {
    name: 'efface_complet',
    aliases: ['erase_complete', 'clear_complete', 'clear_complete'],
    description: 'Supprime la totalité des messages du salon.',
    staffOnly: true,
	clientpermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ManageChannels],
    async execute(message, args) {
        try {
            await message.channel.send(`Le salon va être supprimé dans <t:${Math.round(Date.now() / 1000 + 15)}:R>`);
            setTimeout(async () => {
                let clonedChannel = await message.channel.clone();
                const originalPosition = message.channel.position;
                await message.channel.delete().catch(() => null);
                await clonedChannel.setPosition(originalPosition);
            }, 10000);
        } catch (error) {
            console.error(error);
            await message.channel.send(`Impossible de faire focntionner cette commande. \`Erreur : ${error.message}\``);
        }
    },
};