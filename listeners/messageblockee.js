const { Listener } = require("discord-akairo");

class listenermessageblockee extends Listener {
  constructor() {
    super("commandBlocked", {
      emitter: "commandHandler",
      event: "commandBlocked"
    });
  }

  exec(message, Command) {
    console.log("commandBlocked");

    message.channel.send(`La commande \`${Command}\` n'as pas pu's être exécuté du fait qu'elle est bloquée.`);
  }
}

module.exports = listenermessageblockee;
