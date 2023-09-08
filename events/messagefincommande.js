const { Event } = require("sheweny");

class eventcommandfinished extends Event {
  constructor(CommandsManager) {
    super(CommandsManager, "commandFinished", {
      description: "Quand une commande est terminée",
      once: false,
    });
  }

  exec(message, Command) {
    console.log(
      `La commande ${Command} à été exécutée par ${message.author.tag} de l'id : ${message.author}`
    );
  }
}

module.exports = eventcommandfinished;
