import {ActivityType, Events} from "discord.js";
import pkgjson from "../../package.json" with { type: "json" };
import "dotenv/config";
import https from "https";

export const event = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Prêt ? Le bot est connecté en tant que ${client.user.tag} ( ${client.user.id} )`);
		const activitees = [
			" m*aide",
			" m*aide_nsfw",
			`${client.guilds.cache.size} serveurs !`,
			`la version ${pkgjson.version}...`
		];
		let nombre = 0;
		setInterval(() => {
			client.user.setActivity(activitees[nombre++ % activitees.length], {
				type: ActivityType.Watching,
			});
		}, 12000);
		const uptimeKumaUrl = process.env.UPTIME_KUMA_URL;
		if (!uptimeKumaUrl) {
			console.error("URL Uptime Kuma non définie dans le fichier .env");
			return;
		}
		const makePushRequest = () => {
			https.get(uptimeKumaUrl, (res) => {
				let data = "";
				res.on("data", (chunk) => {
					data += chunk;
				});
				res.on("end", () => {
					//console.log("Réponse de Uptime Kuma:", data);
				});
			}).on("error", (err) => {
				console.error("Erreur lors de la requête Uptime Kuma:", err.message);
			});
		};
		makePushRequest();
		setInterval(() => {
			makePushRequest();
		}, 60000);
	},
};
