const { Collection } = require("discord.js");
const { TOKEN, PREFIX } = require("./config");
const { AkairoClient, CommandHandler, InhibitorHandler } = require("discord-akairo");

class MyClient extends AkairoClient {
  constructor() {
    super({
      ownerID: "268432158262165504"
    }, {
      disableEveryone: true
    });

    this.commandHandler = new CommandHandler(this, {
      directory: "./commands/",
      prefix: ["m*", "@", "M*"]
    });

    this.commandHandler.loadAll();
  }
}

const client = new MyClient();

client.PREFIX = PREFIX;
client.mongoose = require("./util/mongoose");
client.commands = new Collection();


client.commands.set("aide_nsfw", require("./commands/nsfw_aide.js"));
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
client.commands.set("hentai_gif", require("./commands/gif/nsfw/rdm_hentai.js"));
client.commands.set("pied_gif", require("./commands/gif/nsfw/piedgif.js"));
client.commands.set("pied", require("./commands/image/nsfw/piedjpg.js"));
client.commands.set("test", require("./commands/test/test.js"));
client.commands.set("report", require("./commands/moderation/utilitaire/report.js"));
client.commands.set("changelog", require("./commands/moderation/utilitaire/changelog.js"));
client.commands.set("info-bot", require("./commands/moderation/utilitaire/infobot.js"));
client.commands.set("loli", require("./commands/image/nsfw/loli.js"));
client.commands.set("femdom", require("./commands/image/nsfw/femdom.js"));


client.on("ready", () => require("./events/ready.js")(client));
client.on("message", msg => require("./events/message.js")(client, msg));

client.mongoose.init();
client.login(TOKEN);
client.on("error", console.error);
client.on("warn", console.warn);


client.on("ready", () => {
  const activities = [" m*aide", " m*aide_nsfw", "Travail en cours..."];
  client.setInterval(() => {
    const index = Math.floor(Math.random() * activities.length);
    client.user.setActivity(activities[index], {
      type: "WATCHING"
    });
  }, 12000);
});
