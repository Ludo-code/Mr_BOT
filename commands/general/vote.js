import config from '../../config.js';
const { voteURL } = config;
export const command = {
    name: 'vote',
    aliases: ['voting'],
    description: 'Sends the URL to vote for the bot',
    async execute(message, args) {
        await message.reply(voteURL || 'No vote URL');
    },
};