const { Command } = require("sheweny");

class removeuserdbcommands extends Command {
  constructor(client) {
    super(client, {
      name: "retirer",
      description: "Permet de retirer un utilisateur de la base de données",
      aliases: ["retirer"],
      split: "sticky",
      ownerOnly: true,
      args: [
        {
          id: "idguildargs",
          match: "content",
        },
      ],
    });
  }

  async exec(message, args) {
    const client = this.client;
    const member = message.member;
    const idguildargs = args.idguildargs;

    if (message.channel.type === "dm")
      return message.reply("Les tickets en DM sont inutile !");

    if (!member.hasPermission("ADMINISTRATOR")) {
      message.channel.send(
        `${message.author}, désolé mais tu n'as pas les permissions requise.`
      );
      return;
    }

    if (!idguildargs) {
      message.channel.send(
        "n'oublie pas de mettre l'id de la guild et ensuite l'id de l'utilisateur"
      );
    }
    let splittedargs = idguildargs.split(" ");
    await client.ticketsystem.delete(
      `id-de-guild-${splittedargs[0]}-id-de-utilisateur-${splittedargs[1]}`
    );
    message.channel.send("Utilisateur supprimé !");
  }
}
module.exports = removeuserdbcommands;
