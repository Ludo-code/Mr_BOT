const { Client, Collection } = require("discord.js");
const { TOKEN, PREFIX } = require("./config");
const client = new Client({ disableEveryone: true });

client.PREFIX = PREFIX;
client.mongoose = require("./util/mongoose");
client.commands = new Collection();

client.commands.set("repeat", require("./commands/repeat.js"));
client.commands.set("role_mettre", require("./commands/role_mettre.js"));
client.commands.set("info-serv", require("./commands/info-serv.js"));
client.commands.set("aide", require("./commands/aide.js"));
client.commands.set("ping", require("./commands/ping.js"));
client.commands.set("chat", require("./commands/chat.js"));
client.commands.set("meme", require("./commands/meme.js"));
client.commands.set("chatte", require("./commands/chatte.js"));
client.commands.set("seins", require("./commands/seins.js"));
client.commands.set("play", require("./commands/musique.js"));

client.on("ready", () => require("./events/ready.js")(client));
client.on("message", msg => require("./events/message.js")(client, msg));
client.on("guildMemberAdd", member =>
  require(".events/guildMemberAdd.js")(client, member));

client.mongoose.init();
client.login(TOKEN);
client.on("error", console.error);
client.on("warn", console.warn);
