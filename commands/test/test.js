const { TOKEN } = require("C:/Users/Ludovic/Desktop/Discord-Bot/config.js");
module.exports = async (client, message) => {
  const message_bot_on = `Oh the bot is on, soooo awesome you can try m****aide*** or m****aide_nsfw*** ! ${message.author}`;
  if (!["268432158262165504"].includes(message.author.id))
    return message.channel.send(
      `Tu n'as pas les permissiosn suffisante ! ${message.author} désolé a toi.`
    );
  message.channel.send("Restarting...").then(
    client
      .destroy()
      .then(() => {
        process.exit;
      })
      .then(client.login(TOKEN))
  );
  client.on("ready", () => message.channel.send(message_bot_on));
};
