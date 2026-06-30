import fetch from "node-fetch";
import logger from "./logger.js";

export async function getNekos(endpoint) {
    try {
        const response = await fetch(`https://nekos.best/api/v2/${endpoint}`, {
            headers: {
                "User-Agent": "Mr_BOT (https://mr-bot.tech-ludo.fr)",
            },
        });

        if (!response.ok) {
            logger.error(`Nekos.best request failed with status ${response.status} for endpoint ${endpoint}`);
            return null;
        }

        const data = await response.json();
        const imageUrl = data?.results?.[0]?.url;

        if (!imageUrl) {
            logger.error(`Nekos.best returned no image result for endpoint ${endpoint}`);
            return null;
        }

        return imageUrl;
    } catch (error) {
        logger.error(`Impossible de récupérer l'image Nekos.best (${endpoint}): ${error.message}`);
        return null;
    }
}
