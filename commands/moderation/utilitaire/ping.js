module.exports = (client, message) => {
  if (message.channel.type === "dm") return message.reply("Alors on essaye de se cacher ! :joy:");
  const debut = Date.now();
  message.channel
    .send("Pong")
    .then(m => m.edit(`Pong : **${Date.now() - debut}**ms`));
};
