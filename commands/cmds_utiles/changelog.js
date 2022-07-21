const { Command } = require("sheweny");

class changelogcommands extends Command {
  constructor(client) {
    super(client, {
      name: "changelog",
      split: "sticky",
      aliases: ["changelog"],
      description: "Permet de voir le journal des mises à jour",
      cooldown: 10000,
      args: [
        {
          id: "messagecontent",
          match: "content",
        },
      ],
      userPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    });
  }

  exec(message) {
    if (message.channel.type === "dm")
      return message.reply("Alors on essaye de se cacher ! :joy:");
    message.channel.send(
      "ceci est le changelog du bot : ```Nouveauté des mises à jour : \n\n- le 19/07/2022 Reprise du développement et suppression des vieilles commandes.```"
    );
  }
}
module.exports = changelogcommands;
