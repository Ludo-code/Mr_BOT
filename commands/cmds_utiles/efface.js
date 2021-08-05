const { Command } = require("discord-akairo");

class effacecommands extends Command {
  constructor() {
    super("effacer", {
      aliases: ["effacer", "efface"],
      split: "sticky",
      clientPermissions: [
        "SEND_MESSAGES",
        "MANAGE_MESSAGES",
        "READ_MESSAGE_HISTORY",
        "VIEW_CHANNEL",
      ],
    });
  }

  async exec(message) {
    await message.delete();

    const member = message.member;
    if (message.channel.type === "dm") {
      message.reply(
        "Mais mais qu'essaye tu de cacher a mon maître pour vouloir effacer les messages que tu m'as envoyés ? ! :joy:"
      );
    }

    if (!member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) {
      message.channel.send(
        `${message.author}, désolé mais tu n'as pas les permissions requise.`
      );
      return;
    }
    if (member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) {
      const args = message.content.split(" ").slice(1);
      const nombre = args.join(" ");
      if (!nombre) {
        message.channel.send(
          `${message.author}, aucun nombre de message n'as été entré.`
        );
        return;
      } else if (isNaN(nombre)) {
        message.channel.send(
          `${message.author}, désolé vous n'avez pas écrit un nombre.`
        );
        return;
      } else if (nombre < 1) {
        message.channel.send(
          `${message.author}, tu dois au moins effacer un message.`
        );
        return;
      } else if (nombre > 100) {
        message.channel.send(
          `${message.author}, vous ne pouvez pas effacer plus de 100 messages par commande.`
        );
        return;
      } else {
        try {
          await message.channel.bulkDelete(nombre);
        } catch (err) {
          if (err) {
            message.channel.send(
              "Vous ne pouvez pas effacer des messages de plus de 14 jours pour cause des réstrictions d'api de discord. \n\n Utilisez plutôt `m*efface_complet` ou `M*efface_complet` afin d'éffacer tout les messages."
            );
          }
        }
      }
    }
  }
}
module.exports = effacecommands;
