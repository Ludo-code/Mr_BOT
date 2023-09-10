import { EmbedBuilder } from "discord.js";

export const command = {
	name: 'ping',
	aliases: ['beep', 'pong'],
	description: 'Permet de connaître la latence du bot.',
	async execute(message, args) {
		let sent = await message.reply({
			content: `🎉 Pong!`,
		});
		try {
			let embed = new EmbedBuilder()
				.setTitle('🎉 Pong!')
				.setDescription(`- Bâtement de coeur : **${message.client.ws.ping}ms**\n- Latence : **${sent.createdTimestamp - message.createdTimestamp}ms**.`)
				.setColor('Random')
			sent.edit({
				content: '',
				embeds: [embed]
			});
		} catch (e) {
			console.error(e);
		}
	},
};