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
          match: "content",
        },
      ],
      clientPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
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
