const { Listener } = require("discord-akairo");

class guildcreateListener extends Listener {
  constructor() {
    super("guildCreate", {
      emitter: "client",
      event: "guildCreate",
    });
  }

  exec(guild) {
    const client = this.client;
    let channelpardefaut = "";
    guild.channels.cache.forEach((channel) => {
      if (channel.type == "text" && channelpardefaut == "") {
        if (channel.permissionsFor(guild.me).has("SEND_MESSAGE")) {
          channelpardefaut = channel;
        }
      }
    });
    channelpardefaut
      .send(
        "**Merci** de m'avoir ajouté :blush:. La commande d'aide est `m*aide`."
      )
      .then(console.log(`Un nouveau serveur à été ajouté. ${guild.name}`));
    client.channels.cache
      .get("797562341385961524")
      .send(
        "Un nouveau serveur à été ajouté et c'est : " +
          "`" +
          `${guild.name}` +
          "`"
      );
  }
}

module.exports = guildcreateListener;
