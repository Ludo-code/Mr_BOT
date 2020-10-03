const { Collection } = require("discord.js");
const { TOKEN, PREFIX } = require("./config");
const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require("discord-akairo");

class MyClient extends AkairoClient {
  constructor() {
    super({
      ownerID: "268432158262165504"
    }, {
      disableEveryone: true
    });

    this.commandHandler = new CommandHandler(this, {
      directory: "./commands/",
      prefix: ["m*", "@", "M*"],
      ignoreCooldown: ["622504093713170433", "268432158262165504"],
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

const client = new MyClient();

client.PREFIX = PREFIX;
client.commands = new Collection();


client.commands.set("calin", require("./commands/gif/calins.js"));
client.commands.set("embrasse", require("./commands/gif/embrasse.js"));
client.commands.set("neko", require("./commands/gif/neko.js"));
client.commands.set("tapote", require("./commands/gif/tapotte.js"));
client.commands.set("crie", require("./commands/gif/crie.js"));
client.commands.set("gifle", require("./commands/gif/gifle.js"));
client.commands.set("nekonue", require("./commands/image/nsfw/neko_img.js"));
client.commands.set("yuri", require("./commands/gif/nsfw/yuri.js"));
client.commands.set("chatte", require("./commands/image/nsfw/chatte_nsfw.js")); 
client.commands.set("cuni", require("./commands/gif/nsfw/kuni.js"));
client.commands.set("tetons", require("./commands/image/nsfw/tetee.js"));
client.commands.set("neko_gif", require("./commands/gif/nsfw/neko_gif.js"));
client.commands.set("masturbation", require("./commands/gif/nsfw/masturb.js"));
client.commands.set("hentai_gif", require("./commands/gif/nsfw/rdm_hentai.js"));
client.commands.set("pied_gif", require("./commands/gif/nsfw/piedgif.js"));
client.commands.set("pied", require("./commands/image/nsfw/piedjpg.js"));
client.commands.set("info-bot", require("./commands/moderation/utilitaire/infobot.js"));
client.commands.set("loli", require("./commands/image/nsfw/loli.js"));
client.commands.set("femdom", require("./commands/image/nsfw/femdom.js"));


client.on("ready", () => require("./events/ready.js")(client));
client.on("message", msg => require("./events/message.js")(client, msg));

client.login(TOKEN);
client.on("error", console.error);
client.on("warn", console.warn);


client.on("ready", () => {
  const activities = [" m*aide", " m*aide_nsfw", `je suis sur ${client.guilds.cache.size} serveurs !`];
  client.setInterval(() => {
    const index = Math.floor(Math.random() * activities.length);
    client.user.setActivity(activities[index], {
      type: "WATCHING"
    });
  }, 12000);
});
