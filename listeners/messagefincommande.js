const { Listener } = require("discord-akairo");

class listenerfincommande extends Listener {
  constructor() {
    super("fincommande", {
      emitter: "commandHandler",
      event: "commandFinished",
    });
  }

  exec(message, Command) {
    console.log(
      `La commande ${Command} à été exécutée par ${message.author.tag} de l'id : ${message.author}`
    );
  }
}

module.exports = listenerfincommande;
