const { Event } = require("sheweny");

class eventcommandblocked extends Event {
  constructor(CommandsManager) {
    super(CommandsManager, "CommandBlocked", {
      description: "Quand une commande est bloquée",
      once: false,
    });
  }

  exec(message, Command) {
    console.log("commandBlocked");

    message.channel.send(
      `La commande \`${Command}\` n'as pas pu's être exécuté du fait qu'elle est bloquée.`
    );
  }
}

module.exports = eventcommandblocked;
