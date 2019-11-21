module.exports = (client, member) => {
  member.send(
    "Salut a toi ! Bienvenue sur le serveur de ... tout le staff te souhaite la bienvenue !!!"
  );
  const channel = client.channels.find(r => r.name === "entrée-sortie");
  channel.send(
    `${member} nous a rejoint vénérer le (mais pas plus que moi :joy:) !`
  );
};
