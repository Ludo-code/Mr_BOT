module.exports = async (client, message) => {
  if (message.channel.type === "dm") return message.reply("Alors on essaye de se cacher ! :joy:");
  message.channel.startTyping(3);
  client.setTimeout(() => {
    message.channel.send("ceci est le changelog du bot : ```Nouveauté des mises à jour : \n\n- le 21/02/2020 ajout de la commande m*report m*idee et m*changelog. correction de bug mineurs et gros bug. Préparation d'une nouvelle commande.\n\n- le 22/02/2020 ajout d'une fonction pour faire en sorte que le bot puissent écrire. Mais ce n'est pas la nouvelle commande 😉.\n\n- le 28/02/2020 bloquage des commandes en message privé et petites correction de bug.\n\n- le 01/03/2020 ajout de phrase personnalisé par commande quand elles sont en message privé.\n\n- le 04/03/2020 Ajout d'une commande loli 😉 n'en abusez pas 😂, changement du préfix du bot vers @ mais juste @ voila pour moi bye et a plus pour une prochaine maj.\n\n- le ??/??/????```").then(message.channel.stopTyping(true));
  }, 5000); 
};