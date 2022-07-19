const { Listener } = require("discord-akairo");

class guildmemberaddListener extends Listener {
  constructor() {
    super("guildMemberAdd", {
      emitter: "client",
      event: "guildMemberAdd",
    });
  }

  exec(member) {
    const client = this.client;
    if (member.guild.id != "797562340807409704") {
      return;
    } else {
      const bvnrole = member.guild.roles.cache.get("797562340807409707");
      client.channels.cache
        .get("797562341385961526")
        .send(`${member} nous à rejoint souhaitez lui la bienvenue.`)
        .then(member.roles.add(bvnrole));
    }
  }
}

module.exports = guildmemberaddListener;
