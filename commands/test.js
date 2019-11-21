module.exports = async (client, message) => {
  const img_aleatoire = [
    "./images/chatte/1 (1).png",
    "./images/chatte/1 (2).png",
    "./images/chatte/1 (3).png",
    "./images/chatte/1 (4).png",
    "./images/chatte/1 (5).png",
    "./images/chatte/1 (6).png",
    "./images/chatte/1 (7).png",
    "./images/chatte/1 (8).png",
    "./images/chatte/1 (9).png",
    "./images/chatte/1 (10).png",
    "./images/chatte/1 (11).png",
    "./images/chatte/1 (12).png",
    "./images/chatte/1 (13).png",
    "./images/chatte/1 (14).png",
    "./images/chatte/1 (15).png",
    "./images/chatte/1 (16).png",
    "./images/chatte/1 (17).png",
    "./images/chatte/1 (18).png",
    "./images/chatte/1 (19).png",
    "./images/chatte/1 (20).png",
    "./images/chatte/1 (21).png",
    "./images/chatte/1 (22).png",
    "./images/chatte/1 (23).png",
    "./images/chatte/1 (24).png",
    "./images/chatte/1 (25).png",
    "./images/chatte/1 (26).png",
    "./images/chatte/1 (27).png",
    "./images/chatte/1 (28).png",
    "./images/chatte/1 (29).png",
    "./images/chatte/1 (30).png",
    "./images/chatte/1 (31).png",
    "./images/chatte/1 (32).png",
    "./images/chatte/1 (33).png",
    "./images/chatte/1 (34).png",
    "./images/chatte/1 (35).png",
    "./images/chatte/1 (36).png",
    "./images/chatte/1 (37).png",
    "./images/chatte/1 (38).png",
    "./images/chatte/1 (38).png",
    "./images/chatte/1 (39).png",
    "./images/chatte/1 (40).png",
    "./images/chatte/1 (41).png",
    "./images/chatte/1 (42).png",
    "./images/chatte/1 (43).png",
    "./images/chatte/1 (44).png",
    "./images/chatte/1 (45).png",
    "./images/chatte/1 (46).png",
    "./images/chatte/1 (47).png",
    "./images/chatte/1 (48).png",
    "./images/chatte/1 (49).png",
    "./images/chatte/1 (50).png"
  ];
  Nom du code: Hug
  Langage utilisé: JS
  Package à installer: (aucun)
  Adapté à un command handler: Non
  Code:
  if (message.content.startsWith(prefix = 'hug')) {
    message.delete()

    var facts = [
      "https://cdn.discordapp.com/attachments/576038287303507978/576045960468234270/tenor_gif786099605.gif",
      "https://cdn.discordapp.com/attachments/576038287303507978/576046075610398721/tenor_gif2097919235.gif",
      "https://cdn.discordapp.com/attachments/576038287303507978/576046234284851229/tenor_gif1409569625.gif",
      "https://cdn.discordapp.com/attachments/576038287303507978/576046457661161472/tenor_gif-145660273.gif",
      "https://cdn.discordapp.com/attachments/576038287303507978/576046544164487198/tenor_gif-2084372537.gif",
      "VIENS ME FAIRE UN CÂLIN TOI ", "https://cdn.discordapp.com/attachments/576038287303507978/576046708518158355/tenor_gif-461437040.gif",
      "https://cdn.discordapp.com/attachments/576038287303507978/576046640054534144/tenor_gif-1531899666.gif",
      "https://cdn.discordapp.com/attachments/576038287303507978/576046811744305163/tenor_gif289693878.gif",
      "https://cdn.discordapp.com/attachments/576038287303507978/576047026052005901/tenor_gif-1132435972.gif",
      "https://cdn.discordapp.com/attachments/576038287303507978/576047160718786610/tenor_gif1218076412.gif",
      "https://cdn.weeb.sh/images/BkBs2uk_b.gif",
      "https://cdn.weeb.sh/images/rk_6GyncG.gif",
      "https://cdn.weeb.sh/images/ry6o__7D-.gif",
      "https://cdn.weeb.sh/images/Sk2gmRZZG.gif",
      "https://cdn.weeb.sh/images/BkZngAYtb.gif",
      "https://cdn.weeb.sh/images/ByuHsvu8z.gif",
      "https://cdn.weeb.sh/images/Hk3ox0tYW.gif",
      "https://cdn.weeb.sh/images/BkHA_O7v-.gif",
      "https://cdn.weeb.sh/images/S1gUsu_Qw-.gif"];
    var fact = Math.floor(Math.random() * facts.length);



    const hugembed = new Discord.RichEmbed()
      .setColor('#ffffff')
      .setImage(facts[fact])
    message.channel.send(hugembed);

  }