const {
  TOKEN,
  ipdb,
  portdb,
  nomdb,
  nomutilisateur,
  motdepasse,
} = require("./config.js");
const ticketsystem = require("./db-modele/modele-ticket.js");
const { Sequelize } = require("sequelize");
const {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler,
} = require("discord-akairo");

class MyClient extends AkairoClient {
  constructor() {
    super(
      {
        ownerID: "268432158262165504",
      },
      {
        disableMentions: "everyone",
        partials: ["MESSAGE", "CHANNEL", "REACTION", "USER", "GUILD_MEMBER"],
      }
    );

    this.commandHandler = new CommandHandler(this, {
      directory: "./commands/",
      prefix: ["m*", "M*"],
      ignoreCooldown: ["268432158262165504"],
      defaultCooldown: 10000,
    });
    this.listenerHandler = new ListenerHandler(this, {
      directory: "./listeners/",
    });

    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      listenerHandler: this.listenerHandler,
    });
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.loadAll();
    this.commandHandler.loadAll();
  }
}

const client = new MyClient({
  ws: {
    intents: [
      "GUILDS",
      "GUILD_MEMBERS",
      "GUILD_EMOJIS",
      "GUILD_PRESENCES",
      "GUILD_MESSAGES",
      "GUILD_MESSAGE_REACTIONS",
      "DIRECT_MESSAGES",
      "DIRECT_MESSAGE_REACTIONS",
    ],
  },
});
client.db = new Sequelize({
  username: nomutilisateur,
  password: motdepasse,
  database: nomdb,
  host: ipdb,
  port: portdb,
  dialect: "mysql",
});

client.db
  .authenticate()
  .then(() => {
    console.log("Base de donnée connecté");
    ticketsystem.init(client.db);
    ticketsystem.sync();
  })
  .catch((err) => console.log(err));

module.exports = client;

client.login(TOKEN);
client.on("error", console.error);
client.on("warn", console.warn);
