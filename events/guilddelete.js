const { Event } = require("sheweny");

class eventguildelete extends Event {
  constructor(client) {
    super(client, "guildDelete", {
      description: "supression du bot dans un serveur",
      once: false,
    });
  }

  exec(guild) {
    const client = this.client;
    client.channels.cache
      .get("797562341385961524")
      .send(
        "Un serveur à été retiré et c'est : " + "`" + `${guild.name}` + "`"
      );
  }
}

module.exports = eventguildelete;
