module.exports = async (client, message) => {
  if (message.channel.type === "dm") return message.reply("Alors on essaye de se cacher ! :joy:");
  const phrase_rdm_yes = [
    "test 1",
    "test 2",
    "test 3",
    "test 4"
  ];
  const envoie =
    phrase_rdm_yes[Math.floor(Math.random() * phrase_rdm_yes.length)];
  message.channel.startTyping(3);
  client.setTimeout(() => {
    message.channel.send(envoie).then(message.channel.stopTyping(true));
  }, 3000);
};
