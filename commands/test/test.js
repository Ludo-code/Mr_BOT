const { Command } = require("discord-akairo");
const fetch = require("node-fetch");

class testcommands extends Command {
  constructor() {
    super("test", {
      aliases: ["test"],
      split: "sticky",
      ownerOnly: true
    });
  }

  async exec(message) {
    const member = message.member;
if (!member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) {
      message.channel.send(`${message.author}, désolé mais tu n'as pas les permissions requise.`); return;
}
if (member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) {

    const args = message.content.split(' ').slice(1);
    const nombre = args.join(' ');
    message.delete();
    if (!nombre) return message.channel.send(`${message.author}, aucun nombre de message n'as été entré.`);
    if (isNaN(nombre)) return message.channel.send(`${message.author}, désolé vous n'avez pas écrit un nombre.`);
    
    if (nombre > 100) return message.channel.send(`${message.author}, vous ne pouvez pas effacer plus de 100 messages par commande.`);
    if (nombre < 1) return message.channel.send(`${message.author}, tu dois au moins effacer un message.`);
    
    await message.channel.messages.fetch({ limit: nombre }).then(messages => {
        message.channel.bulkDelete(messages
    )});
        }
  }
}
module.exports = testcommands;
