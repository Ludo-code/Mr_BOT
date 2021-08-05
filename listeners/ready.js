const { Listener } = require("discord-akairo");
const { version } = require("../package.json");

class readyListener extends Listener {
  constructor() {
    super("ready", {
      emitter: "client",
      event: "ready",
    });
  }

  exec() {
    console.log(version);
    const client = this.client;
    //client.channels.cache
    //.get("797562341385961524")
    //.send("Le bot est en ligne !")
    //.then(console.log("Bot prêt au combats !!!"));
    const activitees = [
      " m*aide",
      " m*aide_nsfw",
      `${client.guilds.cache.size} serveurs !`,
      `la version ${version}...`,
    ];
    let nombre = 0;
    client.setInterval(() => {
      client.user.setActivity(activitees[nombre++ % activitees.length], {
        type: "WATCHING",
      });
    }, 12000);
  }
}

module.exports = readyListener;
