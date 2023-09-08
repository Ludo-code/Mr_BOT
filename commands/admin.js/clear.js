export const command = {
    name: 'clear',
    aliases: ['delete', 'erase'],
    description: 'Deletes certain number of messages from last!',
    usage: '<number>',
    args: true,
    staffOnly: true,
    async execute(message, args) {
        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return message.reply('that doesn\'t seem to be a valid number.');
        } else if (amount < 1 || amount > 100) {
            return message.reply('You need to input a number between 1 and 100. Please use `erase_complete` command if you want to use clear the whole channel.');
        }

        try {
            await message.channel.bulkDelete(amount);

            message.channel.send(`Deleted ${amount - 1} messages. requested by ${message.author.username}`)
                .then(msg => {
                    setTimeout(() => msg.delete(), 2000)
                })
                .catch(err => message.channel.send(err));
        } catch (error) {
            console.error(error);
            message.channel.send(`Could not clear the messages!  Please use \`erase_complete\` command if you want to use clear the whole channel.\n\`Error: ${error.message}\``);
        }
    },
};