const { Event } = require("sheweny");

class eventguildmemberremove extends Event {
  constructor(client) {
    super(client, "guildMemberRemove", {
      description: "Quand un utilisateur quitte un serveur",
      once: false,
    });
  }

  exec(member) {
    const client = this.client;
    if (member.guild.id != "797562340807409704") {
      return;
    } else {
      client.channels.cache
        .get("797562341385961526")
        .send(`${member} est finalement parti.`);
    }
  }
}

module.exports = eventguildmemberremove;
