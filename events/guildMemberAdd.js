module.exports = (client, member) => {
  const channel = client.channels.find(r => r.name === "entrée-sortie");
  channel.send(`${member} nous a rejoint vénérer le (mais pas plus que moi :joy:) !`);
};
