module.exports = (client, message) => {
  if (message.channel.type === "dm") return message.reply("Un ping un ping non je ne t'authorise pas a l'exécuter en MP pour une fois je suis d'accord avec le patron ! :joy:");
  const debut = Date.now();
  message.channel
    .send("Pong")
    .then(m => m.edit(`Pong : **${Date.now() - debut}**ms`));
};
