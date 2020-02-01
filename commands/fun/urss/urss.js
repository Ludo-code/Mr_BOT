module.exports = async (client, message) => {
  const imagerdm = [
    "./commands/fun/urss/image/poutine.jpg",
    "./commands/fun/urss/image/drapeau-urss.jpg"
  ];
  const phrasealeatoirecalc = [
    "Poutine meilleure président !!!",
    "L'URSS détruirat et vaincrat l'ennemi !!!",
    "Le pouvoir du communisme !!!",
    "L'URSS sont les meilleures"
  ];
  const rep =
    phrasealeatoirecalc[Math.floor(Math.random() * phrasealeatoirecalc.length)];

  const calcul = {
    file: imagerdm[Math.floor(Math.random() * imagerdm.length)]
  };
  message
    .delete({ timeout: 3000 })
    .then(console.log("Un message a été supprimé !"));
  message.channel.send(calcul).then(m => m.edit(rep));
};
