module.exports = (client, message) => {
  if (message.author.bot) return;
  if (message.content.indexOf(client.PREFIX) !== 0) return;
  const args = message.content
    .slice(client.PREFIX.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  if (client.commands.has(command))
    client.commands.get(command)(client, message, args);
};
