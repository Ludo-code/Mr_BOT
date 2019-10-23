const { Client } = require("discord.js");
const { TOKEN, PREFIX } = require("./config");
const client = new Client({ disableEveryone: true });

client.on("ready", () => {
  console.log("Bot prêt au combats !!!");
});

client.on("message", msg => {
  if (msg.content.startsWith(`${PREFIX}ping`)) msg.channel.send("Pong");
  if (msg.content.startsWith(`${PREFIX}pong`)) msg.channel.send("Ping");
});

client.login(TOKEN);
