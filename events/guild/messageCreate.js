import { ChannelType, Collection, Events, PermissionsBitField } from "discord.js";
import winston from "winston";
import "winston-daily-rotate-file";
import { Guild } from "../../schema/schema.js";
import config from "../../config.js";
import PermissionsFR from "../../lang/FR/permissionsFR.js";

const { prefix } = config;
const cooldowns = new Collection();

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.DailyRotateFile({
            filename: "logs/Mr_BOT-%DATE%.log",
            datePattern: "DD-MM-YYYY",
            maxSize: "20m",
            maxFiles: "180d",
            zippedArchive: true,
        }),
    ],
});

export const event = {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {
        try {
            const { client } = message;

            if (message.channel.type === ChannelType.DM) return;
            if (!message.content.toLowerCase().startsWith(prefix.toLowerCase()) || message.author.bot) return;

            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();

            const command = client.commands.get(commandName) ||
                client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

            if (!command) {
                logger.info(`Commande inconnue: ${commandName} par ${message.author.tag} (${message.author.id})`);
                return;
            }

            if (command.staffOnly && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                logger.warn(`Tentative d"exécution de commande réservée au staff: ${commandName} par ${message.author.tag}`);
                return await message.reply("Tu as besoin de la permission `Administrateur` pour exécuter cette commande...");
            }

            if (command.clientpermissions) {
                let missingperms = message.guild.members.me.permissionsIn(message.channel).missing(new PermissionsBitField(command.clientpermissions));
                missingperms = missingperms.toString().toUpperCase();
                let frenchMissingPerms = "";
                for (const [key, values] of Object.entries(PermissionsFR)) {
                    if (values.includes(PermissionsFR[key]) && missingperms.includes(key)) {
                        frenchMissingPerms += PermissionsFR[key] + "; ";
                    }
                }
                frenchMissingPerms = frenchMissingPerms.slice(0, -2);

                if (missingperms?.length) {
                    logger.warn(`Permissions manquantes pour exécuter ${commandName}: ${frenchMissingPerms}`);
                    try {
                        return await message.reply(`Désolé tu n"as pas \`${frenchMissingPerms}\` comme permission pour exécuter cette commande.`);
                    } catch (error) {
                        logger.error(`Erreur lors de l"envoi de la réponse pour permissions manquantes: ${error.message}`);
                        try {
                            await message.author.send("Désolé, je ne peux pas envoyer de message dans le serveur...Je n\'ai peut-être pas la permission `Envoyer des messages`.");
                        } catch (error) {
                            logger.error(`Erreur lors de l"envoi du DM à l"utilisateur: ${error.message}`);
                        }
                    }
                    return;
                }
            }

            if (command.cooldown && typeof command.cooldown === "number") {
                if (!cooldowns.has(command.name)) {
                    cooldowns.set(command.name, new Collection());
                }

                const now = Date.now();
                const timestamps = cooldowns.get(command.name);
                const cooldownAmount = Math.floor(command.cooldown) * 1000;

                if (!timestamps.has(`${message.guild.id}_${message.author.id}`)) {
                    timestamps.set(`${message.guild.id}_${message.author.id}`, now);
                    setTimeout(() => timestamps.delete(`${message.guild.id}_${message.author.id}`), cooldownAmount);
                } else {
                    const expirationTime = timestamps.get(`${message.guild.id}_${message.author.id}`) + cooldownAmount;
                    const timeLeft = (expirationTime - now) / 1000;
                    if (now < expirationTime && timeLeft > 0.9) {
                        logger.info(`Cooldown actif pour ${commandName} par ${message.author.tag}, restant: ${timeLeft.toFixed(1)}s`);
                        return await message.reply({ content: `⏰ Merci d"attendre <t:${Math.round(expirationTime / 1000)}:R> avant d"utiliser la commande **${command.name}** de nouveau.`, ephemeral: true });
                    }
                    timestamps.set(`${message.guild.id}_${message.author.id}`, now);
                    setTimeout(() => timestamps.delete(`${message.guild.id}_${message.author.id}`), cooldownAmount);
                }
            }

            if (command.nsfw) {
                let [g] = await Guild.findOrCreate({
                    where: {
                        guildId: message.guild.id,
                    }
                });

                if (!message.channel.nsfw) {
                    logger.warn(`Commande NSFW utilisée en dehors d"un salon NSFW: ${commandName} par ${message.author.tag}`);
                    return message.reply("Tu ne peux pas exécuter des commandes NSFW en dehors d\'un salon de ce type !");
                }

                if (!g || !g.toJSON()?.nsfwEnabled) {
                    logger.warn(`Commandes NSFW désactivées sur le serveur: ${commandName} par ${message.author.tag}`);
                    return await message.reply("Les commandes NSFW sont désactivées sur ce serveur...");
                }
            }

            if (command.args && !args.length) {
                logger.info(`Arguments manquants pour la commande ${commandName} par ${message.author.tag}`);
                let reply = `Tu n"as entré aucun nom de commande correct, ${message.author}!`;
                if (command.usage) {
                    reply += `\nL"usage correct est : \`${prefix}${command.name} ${command.usage}\``;
                }
                return message.channel.send(reply);
            }

            logger.info(`Exécution de la commande ${commandName} par ${message.author.tag}`);
            await command.execute(message, args, commandName);
        } catch (error) {
            logger.error(`Erreur lors de l"exécution de la commande: ${error.message}`);
            message.reply("Désolé, une erreur est survenue lors de l\'exécution de la commande !");
        }
    },
};
