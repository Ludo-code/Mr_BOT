module.exports = (client, message) => {
  const debut = Date.now();
  message.channel
    .send("Pong")
    .then(m => m.edit(`Pong : **${Date.now() - debut}**ms`));
};
