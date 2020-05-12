const { Command } = require("discord-akairo");

class effacecommands extends Command {
  constructor() {
    super("effacer", {
      aliases: ["effacer"],
      split: "sticky",
      args: [
        {
          id: "join",
          match: "content"
        }
      ]
    });
  }

  async exec(message, args) {
    if (message.channel.type === "dm") return message.reply("Mais mais qu'essaye tu de cacher a mon maître pour vouloir effacer les messages que tu m'as envoyés ? ! :joy:");
    message
      .delete()
      .then(
        console.log(
          `La commande efface a été exécuté par ${message.author.tag} de l'id : ${message.author}`
        )
      );
    const nbdemsg = args.join;
    if (!nbdemsg)
      return message.reply(
        "Vous n'avez pas entrez le nombre de message a supprimer"
      );
    if (isNaN(nbdemsg))
      return message.reply(
        "Désolé mais vous n'avez pas entrez un nombre corect !"
      );
    if (nbdemsg > 100)
      return message.reply(
        "Vous ne pouvez pas supprimer plus de 100 message par commande !"
      );
    if (nbdemsg < 1)
      return message.reply("Vous devez effacer au moins 1 message !");
    await message.channel.fetchMessage({ limit: nbdemsg }, message.channel.bulkDelete(nbdemsg));
  }
}
module.exports = effacecommands;
