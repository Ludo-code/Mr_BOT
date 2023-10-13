import { ChannelType, Collection, Events, PermissionsBitField } from 'discord.js';
import { Guild } from '../../schema/schema.js';
import config from '../../config.js';
import PermissionsFR from '../../permissionsFR.js';
const { prefix } = config;

const cooldowns = new Collection();

export const event = {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {
        try {
            const { client } = message;

            if (message.channel.type == ChannelType.DM) return;
            if (!message.content.toLowerCase().startsWith(prefix.toLowerCase()) || message.author.bot) return;

            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();

            const command = client.commands.get(commandName) ||
                client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

            if (!command) return;

            if (command.staffOnly && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                return await message.reply(`Tu as besoin de la permission \`Administrateur\` pour exécuter la commande...`);
            }

            //checking for client permissions
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
                    try {
                        return await message.reply(`Désolé tu n'a pas \`${frenchMissingPerms}\` comme permission pour exécuter cette commande.`);
                    } catch (error) {
                        try {
                            await message.author.send(`Désolé, je ne peux pas envoyer de message dans le serveur...Je n'ai peut être pas la permission \`Envoyer des messages\`.`)
                        } catch (error) {}
                    }
                    return;
                }
            }

            //checking for cooldown
            if (command.cooldown && typeof command.cooldown == 'number') {
                if (!cooldowns.has(command.name)) {
                    cooldowns.set(command.name, new Collection());
                }

                const now = Date.now();
                const timestamps = cooldowns.get(command.name);
                const cooldownAmount = Math.floor(command.cooldown) * 1000;

                if (!timestamps.has(`${message.guild.id}_${message.author.id}`)) {
                    timestamps.set(`${message.guild.id}_${message.author.id}`, now);
                    setTimeout(() => timestamps.delete(`${message.guild.id}_${message.author.id}`), cooldownAmount);
                }
                else {
                    const expirationTime = timestamps.get(`${message.guild.id}_${message.author.id}`) + cooldownAmount;
                    const timeLeft = (expirationTime - now) / 1000;
                    if (now < expirationTime && timeLeft > 0.9) {
                        return await message.reply({ content: `⏰ Merci d'attendre <t:${Math.round(expirationTime / 1000)}:R> avant d'utiliser la commande **${command.name}** de nouveau.`, ephemeral: true });
                    }
                    timestamps.set(`${message.guild.id}_${message.author.id}`, now);
                    setTimeout(() => timestamps.delete(`${message.guild.id}_${message.author.id}`), cooldownAmount);
                }
            }

            //checking nsfw
            if (command.nsfw) {
                let [g] = await Guild.findOrCreate({
                    where: {
                        guildId: message.guild.id,
                    }
                });

                if (!message.channel.nsfw) {
                    return message.reply('Tu ne peux pas exécuter des commandes nfsw en dehors d\'un salon de ce type !')
                }

                if (!g || !g.toJSON()?.nsfwEnabled) {
                    return await message.reply(`Les commandes NSFW sont désactié sur se serveur...`);
                }
            }

            //Checking args
            if (command.args && !args.length) {
                let reply = `Tu n'a entré aucun nom de commande correct, ${message.author}!`;

                if (command.usage) {
                    reply += `\nL'usage correct est : \`${prefix}${command.name} ${command.usage}\``;
                }

                return message.channel.send(reply);
            }

            //execute

            await command.execute(message, args, commandName);
        } catch (error) {
            console.error(error);
            message.reply('Désolé, une erreur est survenu lors de l\'éxécution d\'une commande !');
        }
    },
};
