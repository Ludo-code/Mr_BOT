import { PermissionsBitField } from 'discord.js';
import config from '../../config.js';
const { voteURL } = config;
export const command = {
    name: 'vote',
    aliases: ['voting'],
    description: 'Envoie le lien pour voter',
    clientpermissions: [PermissionsBitField.Flags.SendMessages],
    async execute(message, args) {
        await message.reply(voteURL || 'Pas d\'url de vote pour le moment');
    },
};