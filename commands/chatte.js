/* eslint-disable comma-dangle */
/* eslint-disable quotes */
module.exports = (client, message) => {
  message
    .delete({ timeout: 3000 })
    .then(console.log("Un message a été supprimé !"));
    
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
  message.channel.send({
    file: img_aleatoire[Math.floor(Math.random() * img_aleatoire.length)]
  });
};
