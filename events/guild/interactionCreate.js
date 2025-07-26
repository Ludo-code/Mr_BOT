import { Events } from "discord.js";
import handleButton from "../../handler/buttonhandler.js";
import logger from "../../utils/logger.js";

export const event = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isButton()) {
			try {
				await handleButton(interaction);
			} catch (error) {
				logger.error(error);
			}
		}
	},
};
