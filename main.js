const { Client, Collection } = require("discord.js");
const { TOKEN, PREFIX } = require("./config");
const client = new Client({ disableEveryone: true });

client.PREFIX = PREFIX;
client.mongoose = require("./util/mongoose");
client.commands = new Collection();

client.commands.set("info-serv", require("./commands/moderation/utilitaire/info-serv.js"));
client.commands.set("aide", require("./commands/aide.js"));
client.commands.set("aide_nsfw", require("./commands/gif/nsfw/nsfw_aide.js"));
client.commands.set("ping", require("./commands/moderation/utilitaire/ping.js"));
client.commands.set("chat", require("./commands/gif/chat.js"));
client.commands.set("meme", require("./commands/gif/meme.js"));
client.commands.set("chatte_gif", require("./commands/gif/nsfw/chatte.js"));
client.commands.set("seins", require("./commands/gif/nsfw/seins.js"));
client.commands.set("panda", require("./commands/image/panda.js"));
client.commands.set("calin", require("./commands/gif/calins.js"));
client.commands.set("embrasse", require("./commands/gif/embrasse.js"));
client.commands.set("neko", require("./commands/gif/neko.js"));
client.commands.set("tapote", require("./commands/gif/tapotte.js"));
client.commands.set("crie", require("./commands/gif/crie.js"));
client.commands.set("gifle", require("./commands/gif/gifle.js"));
client.commands.set("nekonue", require("./commands/gif/nsfw/neko_nsfw.js"));
client.commands.set("hentai", require("./commands/gif/nsfw/hentai.js"));
client.commands.set("yuri", require("./commands/gif/nsfw/yuri.js"));
client.commands.set("ejac", require("./commands/gif/nsfw/ejac.js"));
client.commands.set("effacer", require("./commands/moderation/efface.js"));
client.commands.set("chatte", require("./commands/image/nsfw/chatte_nsfw.js"));
client.commands.set("cuni", require("./commands/gif/nsfw/kuni.js"));
client.commands.set("tetons", require("./commands/image/nsfw/tetee.js"));
client.commands.set("neko_gif", require("./commands/gif/nsfw/neko_gif.js"));
client.commands.set("masturbation", require("./commands/gif/nsfw/masturb.js"));
client.commands.set("rdm_hentai", require("./commands/gif/nsfw/rdm_hentai.js"));
client.commands.set("pied_gif", require("./commands/gif/nsfw/piedgif.js"));
client.commands.set("pied", require("./commands/image/nsfw/piedjpg.js"));
client.commands.set("urss", require("./commands/fun/urss/urss.js"));


client.on("ready", () => require("./events/ready.js")(client));
client.on("message", msg => require("./events/message.js")(client, msg));

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
