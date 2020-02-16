const { TOKEN } = require("C:/Users/Ludovic/Desktop/Discord-Bot/config.js");
module.exports = async (client, message) => {
  if (!["268432158262165504"].includes(message.author.id))
    return message.channel.send(
      `Tu n'as pas les permissiosn suffisante ! ${message.author} désolé a toi.`
    );
  message.channel.send("Restarting...").then(
    client.destroy().then(() => {
      client.login(TOKEN);
    })
  );
  client.on("ready", () =>
    message.channel.send(`Le bot est en ligne ! ${message.author}`));
};
