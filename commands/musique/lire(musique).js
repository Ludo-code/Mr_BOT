const { Command } = require("sheweny");
class lirecommands extends Command {
  constructor(client) {
    super(client, {
      name: "lire",
      description: "Permet de lire une musique",
      aliases: ["lire"],
      cooldown: 10000,
      split: "sticky",
      args: [
        {
          id: "messagecontent",
          match: "content",
        },
      ],
      ownerOnly: true,
    });
  }

  exec(message, args) {}
}
module.exports = lirecommands;
