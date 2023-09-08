import { EmbedBuilder } from "discord.js";

export const command = {
	name: 'ping',
	aliases: ['beep', 'pong'],
	description: 'Replies with pong!',
	async execute(message, args) {
		let sent = await message.reply({
			content: `🎉 Pong!`,
		});
		try {
			let embed = new EmbedBuilder()
				.setTitle('🎉 Pong!')
				.setDescription(`- Heartbeat : **${message.client.ws.ping}ms**\n- Roundtrip latency : **${sent.createdTimestamp - message.createdTimestamp}ms**.`)
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