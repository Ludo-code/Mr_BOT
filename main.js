const { Client } = require("discord.js");
const client = new Client({ disableEveryone: true });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  if (msg.content === "ping") msg.channel.send("Pong");
  if (msg.content === "everyone")
    msg.channel.send("@everyone, salut a tous !!!", { disableEveryone: false });
  if (msg.content === "noteveryone")
    msg.channel.send("@everyone (noteveryone), salut a tous !!!");
});

client.login("NjM2MDk4OTEyODU5NzE3NjM0.Xa-Clw.ERBrQuPwIBGAoXROyhzjsGzarLA");
