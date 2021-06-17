const { Listener } = require("discord-akairo");

class listenerpasdeperms extends Listener {
  constructor() {
    super("missingPermissions", {
      emitter: "commandHandler",
      event: "missingPermissions"
    });
  }

  exec(message, Command, Missing, type) {
    message.channel.send(`La commande \`${Command}\` n'as pas pu être exécuté à cause d'un manque de permission \`${Missing}\`.`);
  }
}

module.exports = listenerpasdeperms;
