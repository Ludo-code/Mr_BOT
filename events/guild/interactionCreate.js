import { Events } from "discord.js";
import handleButton from "../../handler/buttonhandler.js";

export const event = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isButton()) {
			try {
				await handleButton(interaction);
			} catch (error) {
				console.error(error);
			}
		}
	},
};
