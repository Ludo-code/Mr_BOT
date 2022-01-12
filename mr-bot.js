const {
  TOKEN,
  ipdb,
  portdb,
  nomdb,
  nomutilisateur,
  motdepasse,
} = require("./config.js");
const ticketsystem = require("./db-modele/modele-ticket.js");
const parametreguilds = require("./db-modele/modele-parametreguilds.js");
const { Sequelize } = require("sequelize");
const { ShewenyClient } = require("sheweny");

const client = new ShewenyClient({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MEMBERS",
    "GUILD_EMOJIS_AND_STICKERS",
    "GUILD_PRESENCES",
    "GUILD_MESSAGE_REACTIONS",
    "DIRECT_MESSAGES",
    "GUILD_INTEGRATIONS",
  ],
  admins: ["268432158262165504"],
  mode: "development",
  allowedMentions: { parse: ["everyone"] },
  managers: {
    commands: {
      directory: "./commands",
      prefix: ["m*", "M*"],
      guildId: "797562340807409704",
    },
    events: {
      directory: "./listeners",
    },
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
    parametreguilds.init(client.db);
    ticketsystem.sync();
    parametreguilds.sync();
  })
  .catch((err) => console.log(err));

module.exports = client;

client.login(TOKEN);
client.on("error", console.error);
client.on("warn", console.warn);
