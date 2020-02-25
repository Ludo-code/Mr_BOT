module.exports = async (client, message) => {
  message.channel.startTyping(3);
  client.setTimeout(() => {
    message.channel.send("Retrouve le bot sur GITHUB (https://github.com/Ludo-code/Mr_BOT) \n\n Le bot a été crée par Ludovic 17 ans.").then(message.channel.stopTyping(true));
  }, 3000); 
};
