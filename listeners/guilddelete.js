const { Listener } = require("discord-akairo");

class guilddeleteListener extends Listener {
    constructor() {
        super("guildDelete", {
            emitter: "client",
            event: "guildDelete"
        });
    }

    exec(guild) {
    const client = this.client;
          client.channels.cache.get("797562341385961524").send("Un serveur à été retiré et c'est : " + "`" + `${guild.name}` + "`");
    }
}

module.exports = guilddeleteListener;