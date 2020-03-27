const { Command } = require("discord-akairo");
class ursscommands extends Command {
  constructor() {
    super("urss", {
      aliases: ["urss"]
    });
  }

  exec(message) {
    if (message.channel.type === "dm") return message.reply("Alors on essaye de cacher son côté Comuniste ! :joy:");
    const imagerdm = [
      "./commands/fun/urss/image/poutine.jpg",
      "./commands/fun/urss/image/drapeau-urss.jpg",
      "./commands/fun/urss/image/ex-urss-mauvaise.jpg",
      "./commands/fun/urss/image/histoire-urss.jpg"
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
      .then(console.log(`La commande urss a été exécuté par ${message.author.username} de l'id : ${message.author}`));
    message.channel.send(calcul).then(m => m.edit(rep));
  }
}
module.exports = ursscommands;
