module.exports = async (client, message, args) => {
  message.delete();
  if (!["268432158262165504", "398053300341309441"].includes(message.author.id))
    return message.channel.send(`Tu n'as pas les permissiosn suffisante ! ${message.author} désolé a toi.`);
  const nbdemsg = args.join(" ");
  if (!nbdemsg)
    return message.reply(
      "Vous n'avez pas entrez le nombre de message a supprimer"
    );
  if (isNaN(nbdemsg))
    return message.reply(
      "Désolé mais vous n'avez pas entrez un nombre corect !"
    );
  if (nbdemsg > 100)
    return message.reply(
      "Vous ne pouvez pas supprimer plus de 100 message par commande !"
    );
  if (nbdemsg < 1)
    return message.reply("Vous devez effacer au moins 1 message !");
  await message.channel.fetchMessage({ limit: nbdemsg }, message.channel.bulkDelete(nbdemsg));
};
