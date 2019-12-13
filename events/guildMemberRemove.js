module.exports = (client, member) => {
  const channel = client.channels.find(r => r.name === "entrée-sortie");
  channel.send(`${member} nous a quitté, nous le regrettons déja !`);
};
