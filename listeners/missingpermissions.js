const { Listener } = require("discord-akairo");

class listenerpasdeperms extends Listener {
  constructor() {
    super("missingPermissions", {
      emitter: "commandHandler",
      event: "missingPermissions"
    });
  }

  exec(message, command, type, missing) {
let msgperm = type === 'user' ? `Il te manque la permission **${missing}** ` : `Il manque la permission **${missing}** au bot.`

message.channel.send(msgperm)
  }
}

module.exports = listenerpasdeperms;
