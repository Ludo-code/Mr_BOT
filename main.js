const { Client, Collection } = require("discord.js");
const { TOKEN, PREFIX } = require("./config");
const client = new Client({ disableEveryone: true });

client.PREFIX = PREFIX;
client.mongoose = require("./util/mongoose");
client.commands = new Collection();

client.commands.set("info-serv", require("./commands/info-serv.js"));
client.commands.set("aide", require("./commands/aide.js"));
client.commands.set("aide_nsfw", require("./commands/nsfw_aide.js"));
client.commands.set("ping", require("./commands/ping.js"));
client.commands.set("chat", require("./commands/chat.js"));
client.commands.set("meme", require("./commands/meme.js"));
client.commands.set("chatte", require("./commands/chatte.js"));
client.commands.set("seins", require("./commands/seins.js"));
client.commands.set("panda", require("./commands/panda.js"));
client.commands.set("calin", require("./commands/gif/calins.js"));
client.commands.set("embrasse", require("./commands/gif/embrasse.js"));
client.commands.set("neko", require("./commands/gif/neko.js"));
client.commands.set("tapote", require("./commands/tapotte.js"));
client.commands.set("crie", require("./commands/crie.js"));
client.commands.set("gifle", require("./commands/gifle.js"));
client.commands.set("nekonue", require("./commands/neko_nsfw.js"));
client.commands.set("effacer", require("./commands/clear.js"));
client.commands.set("hentai", require("./commands/gif/hentai.js"));
client.commands.set("yuri", require("./commands/gif/yuri.js"));
client.commands.set("lesbi", require("./commands/gif/lesbian.js"));
client.commands.set("ejac", require("./commands/gif/ejac.js"));

client.on("ready", () => require("./events/ready.js")(client));
client.on("message", msg => require("./events/message.js")(client, msg));
client.on("guildMemberAdd", member =>
  require("./events/guildMemberAdd.js")(client, member));

client.mongoose.init();
client.login(TOKEN);
client.on("error", console.error);
client.on("warn", console.warn);


client.on("ready", () => {
  const activities = [" *aide", " *aide_nsfw", "En cours de développement...."];
  client.setInterval(() => {
    const index = Math.floor(Math.random() * activities.length);
    client.user.setActivity(activities[index], {
      type: "WATCHING"
    });
  }, 12000);
});
