import {ActivityType, Events} from 'discord.js';

export const event = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Prêt ? Le bot est connecté en tant que ${client.user.tag} ( ${client.user.id} )`);
		const activitees = [
		  " m*aide",
		  " m*aide_nsfw",
		  `${client.guilds.cache.size} serveurs !`,
		  `la version 3.0.0...`,
		];
		let nombre = 0;
		setInterval(() => {
		  client.user.setActivity(activitees[nombre++ % activitees.length], {
			type: ActivityType.Watching,
		  });
		}, 12000);
	},
};