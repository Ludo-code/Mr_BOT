const { Listener } = require("discord-akairo");

class readyListener extends Listener {
    constructor() {
        super("ready", {
            emitter: "client",
            event: "ready"
        });
    }

    exec() {
    const client = this.client;
        console.log('Bot prêt au combats !!!');
        const activitees = [" m*aide", " m*aide_nsfw", `je suis sur ${client.guilds.cache.size} serveurs !`];
        client.setInterval(() => {
          const actiindex = Math.floor(Math.random() * activitees.length);
          client.user.setActivity(activitees[actiindex], {
            type: "WATCHING"
          });
        }, 12000);
    }
}

module.exports = readyListener;