const { Command } = require("discord-akairo");
class lirecommands extends Command {
  constructor() {
    super("lire", {
      aliases: ["lire"],
      cooldown: 10000,
      split: "sticky",
      args: [
        {
          id: "messagecontent",
          match: "content"
        }
      ],
      ownerOnly: true
    });
  }

  exec(message, args) {

  }
}
module.exports = lirecommands;
