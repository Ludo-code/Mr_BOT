import { AttachmentBuilder, Colors, EmbedBuilder, PermissionsBitField } from "discord.js";
import config from "../../config.js";
const { ownerId } = config;

export const command = {
    name: "bug",
    description: "Permet de rapporter un bug. Il est possible de joindre un fichier ou plusieurs.",
    usage: "<message>",
    args: true,
    cooldown: 43200,
    clientpermissions: [PermissionsBitField.Flags.SendMessages],
    async execute(message, args) {
        if (!args?.length) return;

        let msg = args.join(" ");
        let attachments = message.attachments.map(a => {
            return new AttachmentBuilder(a.url);
        })
   
        let owner;
        try {
            owner = await message.client.users.fetch(ownerId);
        } catch (error) {
            console.error(error);
        }

        if (!owner) return;

        let embed = new EmbedBuilder()
            .setTitle(`Bug report par ${message.author.username}`)
            .setDescription(msg)
            .addFields(
                {
                    name: "Utilisateur",
                    value: `> nom ${message.author.username}\n> ID: ${message.author.id}`
                }
            )
            .setThumbnail(message.author.displayAvatarURL({
                size: 1024,
                forceStatic: false,
                extension: "png"
            }))
            .setColor(Colors.DarkPurple)
        try {
            await owner.send({
                embeds: [embed],
                files: attachments,
            });

            await message.reply("✅ Le rapport de bug à bien été envoyé.")
        } catch (error) {
            console.error(error);
            await message.reply("❌ Impossible d\'envoyer le rapport de bug.")
        }
    },
};
