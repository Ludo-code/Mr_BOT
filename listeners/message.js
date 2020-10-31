const { Listener } = require("discord-akairo");

class messageListener extends Listener {
    constructor() {
        super("message", {
            emitter: "client",
            event: "message"
        });
    }

    exec() {
        console.log('évnènement message déclenché');
    }
}

module.exports = messageListener;