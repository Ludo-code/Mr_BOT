const { Command } = require("discord-akairo");

class changelogcommands extends Command {
  constructor() {
    super("changelog", {
      aliases: ["changelog"],
      cooldown: 10000,
      split: "sticky",
      args: [
        {
          id: "messagecontent",
          match: "content"
        }
      ]
    });
  }

  exec(message) {

    if (message.channel.type === "dm") return message.reply("Alors on essaye de se cacher ! :joy:");
    message.channel.send("ceci est le changelog du bot : ```Nouveauté des mises à jour : \n\n- le 21/02/2020 ajout de la commande m*report m*idee et m*changelog. correction de bug mineurs et gros bug. Préparation d'une nouvelle commande.\n\n- le 22/02/2020 ajout d'une fonction pour faire en sorte que le bot puissent écrire. Mais ce n'est pas la nouvelle commande 😉.\n\n- le 28/02/2020 bloquage des commandes en message privé et petites correction de bug.\n\n- le 01/03/2020 ajout de phrase personnalisé par commande quand elles sont en message privé.\n\n- le 04/03/2020 Ajout d'une commande loli 😉 n'en abusez pas 😂, changement du préfix du bot vers @ mais juste @ voila pour moi bye et a plus pour une prochaine maj.\n\n- le 27/03/2020 Ajout de la commande femdom.\n\n- le 02/04/2020 Correction des embeds suite a une mise a jour vers discord.js V12, amélioration des logs.\n\n- le 28/04/2020 Correction de bug sur report et aide ainsi que le début de nouvelle commande et améliorations```");
  }
}
module.exports = changelogcommands;
