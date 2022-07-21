const { Event } = require("sheweny");

class eventguildmemberadd extends Event {
  constructor(client) {
    super(client, "guildMemberAdd", {
      description: "Quand un utilisateur rejoint un serveur",
      once: false,
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

module.exports = eventguildmemberadd;
