const { Event, Command } = require("sheweny");

class eventcooldown extends Event {
  constructor(client) {
    super(client, "cooldownLimit", {
      description: "Limite cooldown",
      once: false,
    });
  }

  exec(message, Command, time) {
    console.log("cooldown");

    const base = time;
    const heures = Math.floor(base / 3600);
    const resteheures = Math.floor(base % 3600);
    const minutes = Math.floor(resteheures / 60);
    const secondes = Math.floor(resteheures % 60);

    message.channel.send(
      `La commande \`${Command}\` est en cooldown merci d'attendre **${heures} heures, ${minutes} minutes, ${secondes} secondes.**`
    );
  }
}

module.exports = eventcooldown;
