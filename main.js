const { Client, MessageEmbed } = require("discord.js");
const { TOKEN, PREFIX } = require("./config");
const client = new Client({ disableEveryone: true });

client.on("message", msg => {
  if (msg.author.bot) return;
  if (msg.content.indexOf(PREFIX) !== 0) return;
  const args = msg.content
    .slice(PREFIX.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd === "repeat") {
    msg.channel.send(args.join(" "));
    msg
      .delete({ timeout: 3000 })
      .then(console.log("Un message a été supprimé !"));
  }
  if (cmd === "role_mettre") {
    const role = msg.guild.roles.find(r => r.name === args[0]);
    if (!role) return msg.channel.send("Le rôle demander n'existe pas !");
    if (msg.member.roles.find(r => r.name === args[0])) {
      msg.member.roles.remove(role);
      msg.channel.send(
        `Rôle ${role} supprimé pour l'utilisateur ${msg.author}.`
      );
      msg.delete({ timeout: 3000 });
    } else {
      msg.member.roles.add(role);
      msg.channel.send(
        `Rôle ${role} ajouter pour l'utilisateur ${msg.author}.`
      );
      msg.delete({ timeout: 3000 });
    }
  }
  if (cmd === "serv-info") {
    const embed = new MessageEmbed()
      .setColor("#ff00dc")
      .setTitle("Information sur le serveur :")
      .addField("Nom du serveur :", msg.guild.name)
      .setThumbnail(msg.guild.iconURL())
      .addField("Nombres de membres :", msg.guild.memberCount, true)
      .addField("Crée par : ", msg.guild.owner.user.tag, true)
      .addField("Serveur crée le :", msg.guild.createdAt)
      .addField("Vous avez rejoint le :", msg.member.joinedAt);
    msg.channel.send(embed);
  }
});

client.on("guildMemberAdd", member => {
  member.send(
    "Salut a toi ! Bienvenue sur le serveur de ... tout le staff te souhaite la bienvenue !!! "
  );
  const channel = client.channels.find(r => r.name === "general");
  channel.send(
    `${member} nous a rejoint vénérer le (mais pas plus que moi :joy:) !`
  );
});
client.login(TOKEN);

// -------------------------------------------------------------------------------------------------

client.on("ready", () => console.log("Bot prêt au combats !!!"));
client.on("error", console.error);
client.on("warn", console.warn);
client.on("debug", console.log);
