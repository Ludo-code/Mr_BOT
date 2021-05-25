const { Listener } = require("discord-akairo");

class listenercooldown extends Listener {
  constructor() {
    super("cooldown", {
      emitter: "commandHandler",
      event: "cooldown"
    });
  }

  exec(message, Command, number) {
    console.log("cooldown");
    const secondes = Math.floor(number / 1000) % 60;
    
    const minutes = Math.floor(number / 60000) % 60;
    message.channel.send(`La commande \`${Command}\` est en cooldown merci d'attendre **${minutes} minutes, ${secondes} secondes.**`);
  }
}

module.exports = listenercooldown;
