import changelogs from "../../changelogs.js";

export const command = {
    name: 'changelog',
    description: 'See the changelog',
    async execute(message, args) {
        if(!changelogs?.length) return await message.reply("Il n'y a pas de changelog pour le moment");
        let text = changelogs.map(c => `- ${c}`).join('\n');
        await message.reply(`# Changelogs\n${text}`);
    },
};