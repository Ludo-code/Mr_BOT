module.exports = async (client, message) => {
  if (message.channel.type === "dm") return message.reply("Alors on essaye de se cacher ! :joy:");
  message.channel.startTyping(3);
  client.setTimeout(() => {
    message.channel.send(`${message.author}, ceci est la commande pour sugérrer une idée pour le bot, pour ce faire rien de plus simple il faut juste envoyer un message privé a 🌊𝓜𝓻_𝓞𝓢𝓢117🔥#2795 et je verrais si oui ou non l'idée est intéressante a ajouter !`).then(message.channel.stopTyping(true));
  }, 3000); 
};
