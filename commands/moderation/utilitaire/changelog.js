module.exports = async (client, message) => {
  message.channel.startTyping(3);
  client.setTimeout(() => {
    message.channel.send("ceci est le changelog du bot : ```Nouveauté des mises à jour : \n\n- le 21/02/2020 ajout de la commande m*report m*idee et m*changelog. correction de bug mineurs et gros bug. Préparation d'une nouvelle commande.\n\n- le 22/02/2020 ajout d'une fonction pour faire en sorte que le bot puissent écrire. Mais ce n'est pas la nouvelle commande 😉.\n\n- le ??/??/????```").then(message.channel.stopTyping(true));
  }, 3000); 
};
