import { ChannelType, Collection, Events, PermissionsBitField } from "discord.js";
import logger from "../../utils/logger.js";
import { Guild } from "../../schema/schema.js";
import config from "../../config.js";
import { getTranslations } from "../../lang/index.js";

const { prefix } = config;
const cooldowns = new Collection();

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

            let [g] = await Guild.findOrCreate({
                where: {
                    guildId: message.guild.id,
                }
            });
            const lang = g?.toJSON()?.language || 'fr';
            const translations = getTranslations(lang);

            if (command.staffOnly && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                logger.warn(`Tentative d'exécution de commande réservée au staff: ${commandName} par ${message.author.tag}`);
                return await message.reply(translations.messages.NEED_ADMIN_PERMISSION);
            }

            if (command.clientpermissions) {
                let missingperms = message.guild.members.me.permissionsIn(message.channel).missing(new PermissionsBitField(command.clientpermissions));
                missingperms = missingperms.toString().toUpperCase();
                let humanMissingPerms = "";
                for (const [key, value] of Object.entries(translations.permissions)) {
                    if (missingperms.includes(key)) {
                        humanMissingPerms += value + "; ";
                    }
                }
                humanMissingPerms = humanMissingPerms.slice(0, -2);

                if (missingperms?.length) {
                    logger.warn(`Permissions manquantes pour exécuter ${commandName}: ${humanMissingPerms}`);
                    try {
                        return await message.reply(translations.messages.MISSING_PERMISSIONS.replace('{perms}', humanMissingPerms));
                    } catch (error) {
                        logger.error(`Erreur lors de l'envoi de la réponse pour permissions manquantes: ${error.message}`);
                        try {
                            await message.author.send(translations.messages.CANT_SEND_IN_SERVER_DM);
                        } catch (error) {
                            logger.error(`Erreur lors de l'envoi du DM à l'utilisateur: ${error.message}`);
                        }
                    }
                    return;
                }
            }

            if (command.nsfw) {
                if (!message.channel.nsfw) {
                    logger.warn(`Commande NSFW utilisée en dehors d'un salon NSFW: ${commandName} par ${message.author.tag}`);
                    return message.reply(translations.messages.NSFW_ONLY_CHANNEL);
                }

                if (!g || !g.toJSON()?.nsfwEnabled) {
                    logger.warn(`Commandes NSFW désactivées sur le serveur: ${commandName} par ${message.author.tag}`);
                    return await message.reply(translations.messages.NSFW_DISABLED);
                }
            }

            if (command.args && !args.length) {
                logger.info(`Arguments manquants pour la commande ${commandName} par ${message.author.tag}`);
                let reply = translations.messages.MISSING_ARGS.replace('{user}', `${message.author}`);
                if (command.usage) {
                    reply += `\n${translations.messages.USAGE_PREFIX || 'Usage:'} \`${prefix}${command.name} ${command.usage}\``;
                }
                return message.channel.send(reply);
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
                        const cdMsg = translations.messages.COOLDOWN_MSG.replace('{ts}', Math.round(expirationTime / 1000)).replace('{cmd}', command.name);
                        return await message.reply({ content: cdMsg, ephemeral: true });
                    }
                    timestamps.set(`${message.guild.id}_${message.author.id}`, now);
                    setTimeout(() => timestamps.delete(`${message.guild.id}_${message.author.id}`), cooldownAmount);
                }
            }

            logger.info(`Exécution de la commande ${commandName} par ${message.author.tag}`);
            await command.execute(message, args, commandName);
        } catch (error) {
            logger.error(`Erreur lors de l'exécution de la commande: ${error.message}`);
            message.reply(getTranslations('fr').messages.COMMAND_ERROR);
        }
    },
};
