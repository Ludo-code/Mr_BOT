const { Listener } = require("discord-akairo");
//ICI pour système de niveau.
class messageListener extends Listener {
  constructor() {
    super("message", {
      emitter: "client",
      event: "message",
    });
  }

  exec(message) {
    function fonctionmessageprefix() {
      let prefix;
      if (message.content.startsWith("m*")) {
        prefix = "m*";
      } else if (message.content.startsWith("M*")) {
        prefix = "M*";
      }
      return prefix;
    }

    if (
      !message.content.startsWith(fonctionmessageprefix()) ||
      message.author.bot
    )
      return;

    console.log(`évènement message déclenché par ${message.author.tag}`);
  }
}

module.exports = messageListener;
