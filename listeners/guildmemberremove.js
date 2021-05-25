const { Listener } = require("discord-akairo");

class guildmemberremoveListener extends Listener {
    constructor() {
        super("guildMemberRemove", {
            emitter: "client",
            event: "guildMemberRemove",
        });
    }

    exec(member) {
    const client = this.client;
    if (member.guild.id != "797562340807409704") {
        return;
    } else {
        client.channels.cache.get("797562341385961526").send(`${member} est finalement parti.`)
    }
    }
}

module.exports = guildmemberremoveListener;