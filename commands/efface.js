module.exports = async (client, message, args) => {
  if (!["268432158262165504"].includes(message.author.id))
    return message.channel.send(`Tu n'as pas les permissiosn suffisante ! ${message.author} désolé a toi.`);
  try {
    await message.delete();
    const msgToDelete = args[0]
      ? `**${args[0]} messages supprimés (si les messages n'ont pas été supprimé cela provient du fait que discord n'accepte pas qu'on efface des messages de plus de deux semaines et pas plus de 100 a la fois.)**`
      : "Merci d'entrez un chiffre (exemple : *effacer 20), ⚠ Pas plus de 100 messages ! ⚠";
    message.channel.fetchMessages({ limit: args[0] }).then(messages => {
      message.channel.bulkDelete(messages);
      message.channel.send(msgToDelete).then(msg => msg.delete(10000));
    });
  } catch (e) {
    console.log(e);
  }
};
