module.exports = async (client, message) => {
  message.channel.startTyping(3);
  client.setTimeout(() => {
    message.channel.send(`${message.author}, ceci est la commande pour report un problème avec le bot pour ce faire rien de plus simple il faut juste envoyer un message privé a 🌊𝓜𝓻_𝓞𝓢𝓢117🔥#2795 et j'éssayerais de vous aidez et de résoudre le problème au plus vite !`).then(message.channel.stopTyping(true));
  }, 3000); 
};
