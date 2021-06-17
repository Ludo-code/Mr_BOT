const { Listener } = require("discord-akairo");

class listenerpasdeperms extends Listener {
  constructor() {
    super("missingPermissions", {
      emitter: "commandHandler",
      event: "missingPermissions"
    });
  }

  exec(message, command, missing) {
    message.channel.send(`La commande \`${command}\` n'as pas pu's être exécuté à cause d'un manque de permission \`${missing}\`.`);
  }
}

module.exports = listenerpasdeperms;
