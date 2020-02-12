const { RichEmbed } = require("discord.js");

module.exports = async (client, message) => {
  const imagerdm = [
    "https://mr-oss117.tk/img/lol.gif",
    "https://mr-oss117.tk/img/textures_packs/Anime_ART/mc1.png",
    "https://mr-oss117.tk/img/textures_packs/Anime_ART/mc2.png",
    "https://mr-oss117.tk/img/textures_packs/Anime_ART/mc3.png",
    "https://mr-oss117.tk/img/textures_packs/Anime_ART/mc4.png",
    "https://mr-oss117.tk/img/textures_packs/Anime_ART/mc5.png",
    "https://mr-oss117.tk/img/textures_packs/Anime_ART/mc6.png",
    "https://mr-oss117.tk/img/textures_packs/Anime_ART/mc7.png",
    "https://mr-oss117.tk/img/textures_packs/Anime_ART/mc8.png"
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
  const embed = new RichEmbed()
    .setTitle(rep)
    .setImage(calcul)
    .setFooter(`Demandé par ${message.author.username}`);
  message.channel.send(embed);
};
