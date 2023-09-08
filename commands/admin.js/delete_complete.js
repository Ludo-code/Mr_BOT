export const command = {
    name: 'delete_complete',
    aliases: ['erase_complete', 'clear_complete'],
    description: 'Clears the whole channel',
    staffOnly: true,
    async execute(message, args) {
        try {
            await message.channel.send(`This channel will be deleted <t:${Math.round(Date.now() / 1000 + 15)}:R>`);
            setTimeout(async () => {
                let clonedChannel = await message.channel.clone();
                const originalPosition = message.channel.position;
                await message.channel.delete().catch(() => null);
                await clonedChannel.setPosition(originalPosition);
            }, 10000);
        } catch (error) {
            console.error(error);
            await message.channel.send(`Could not run this command. \`Error: ${error.message}\``);
        }
    },
};