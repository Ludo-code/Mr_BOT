module.exports = (client, message, args) => {
  const role = message.guild.roles.find(r => r.name === args[0]);
  if (!role) return message.channel.send("Le rôle demander n'existe pas !");

  if (message.member.roles.find(r => r.name === args[0])) {
    message.member.roles.remove(role);
    message.channel.send(
      `Rôle ${role} supprimé pour l'utilisateur ${message.author}.`
    );
    message.delete({ timeout: 3000 });
  } else {
    message.member.roles.add(role);
    message.channel.send(
      `Rôle ${role} ajouter pour l'utilisateur ${message.author}.`
    );
    message.delete({ timeout: 3000 });
  }
};
