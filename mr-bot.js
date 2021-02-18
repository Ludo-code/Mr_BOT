const { TOKEN } = require("./config");
const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require("discord-akairo");
const enmap = require("enmap")

class MyClient extends AkairoClient {
  constructor() {
    super({
      ownerID: "268432158262165504"
    }, {
      disableEveryone: true
    });

    this.commandHandler = new CommandHandler(this, {
      directory: "./commands/",
      prefix: ["m*", "M*"],
      ignoreCooldown: ["268432158262165504"],
      defaultCooldown: 10000
    });
    this.listenerHandler = new ListenerHandler(this, {
      directory: "./listeners/"
    });

    this.commandHandler.loadAll();
    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      listenerHandler: this.listenerHandler
    });
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.loadAll();
  }
}

const client = new MyClient({
 ws: { intents: [
  "GUILDS", "GUILD_MEMBERS", "GUILD_EMOJIS", "GUILD_PRESENCES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS"
 ] }
});

client.ticketsystem = new enmap({
  name: "ticketsystem",
  autoFetch: true,
  cloneLevel: "deep",
  fetchAll: true
});

module.exports = client;

client.login(TOKEN);
client.on("error", console.error);
client.on("warn", console.warn);
