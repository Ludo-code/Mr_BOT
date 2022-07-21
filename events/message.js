const { Event } = require("sheweny");

class eventmessage extends Event {
  constructor(client) {
    super(client, "message", {
      description: "Quand le bot est appelé.",
      once: false,
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
    ) {
      return;
    } else {
      console.log(`évènement message déclenché par ${message.author.tag}`);
    }
  }
}

module.exports = eventmessage;
