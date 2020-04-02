module.exports = async (client, message) => {
  if (message.channel.type === "dm") return message.reply("Je veux bien du loli mais va dans un channel nsfw ! :joy:");
  if (!message.channel.nsfw) return message.channel.send(`Désolé ${message.author} mais tu ne peux faire cette commande que dans un salon nsfw !`);
  const calcul_age = [
    "12",
    "45",
    "123",
    "26",
    "87",
    "97",
    "28",
    "84",
    "69",
    "900"
  ];
  const age =
    calcul_age[Math.floor(Math.random() * calcul_age.length)];
  const phrase_rdm_yes = [
    "Attend tu m'as demandé une image de loli surtout ne bouge pas j'appel la police :joy:",
    "Du loli du loli laisse moi réfléchir non désolé mais je ne peux pas accéder a ta requête comme c'est dommage :joy:",
    `J'ai une loli mais tu dois attendre encore ${age} années avant qu'elle soit assez mature c'est nos norme de maturité :joy:`,
    "Oh bah du loli c'est pas bien mon bon monsieur pas les enfants."
  ];
  const envoie =
    phrase_rdm_yes[Math.floor(Math.random() * phrase_rdm_yes.length)];
  message.channel.startTyping(3);
  client.setTimeout(() => {
    message.channel
      .send(envoie)
      .then(message.channel.stopTyping(true))
      .then(
        console.log(
          `La commande loli a été exécuté par ${message.author.tag} de l'id : ${message.author}`
        )
      );
  }, 3000);
};
