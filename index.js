import "dotenv/config";
import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

import { Client, Collection, GatewayIntentBits } from "discord.js";

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers]
})

client.commands = new Collection();
client.membersCachedInServer = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFolers = fs.readdirSync(commandsPath).filter(file => fs.statSync(path.join(commandsPath, file)).isDirectory())

for (const folder of commandFolers) {
    let files = fs.readdirSync(path.join(commandsPath, `${folder}`)).filter(f => f.endsWith(".js"));
    for (const file of files) {
        const command = (await import(`./commands/${folder}/${file}`)).command;

        if ("name" in command && "execute" in command) {
            client.commands.set(command.name, command);
            console.log(`✔️ La commande suivante à été chargé : ${command.name}`);
        } else {
            console.log(`[ATTENTION] La commande "./commands/${folder}/${file}" manque un "name" ou une propriété "execute"`);
        }
    }
}

const eventsPath = path.join(__dirname, "events");
const eventFolers = fs.readdirSync(eventsPath).filter(file => fs.statSync(path.join(eventsPath, file)).isDirectory())

for (const folder of eventFolers) {
    let files = fs.readdirSync(path.join(eventsPath, `${folder}`)).filter(f => f.endsWith(".js"));
    for (const file of files) {
        const event = (await import(`./events/${folder}/${file}`)).event;

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }

        console.log(`📣 L"évènement suivant à été chargé : ${event.name}`)
    }
}

client.login(process.env.BOT_TOKEN);
