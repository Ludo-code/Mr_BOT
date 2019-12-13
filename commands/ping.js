module.exports = (client, message) => {
  const debut = Date.now();
  message.channel
    .send("Ping")
    .then(m => m.edit(`Pong : **${Date.now() - debut}**ms`));
};
