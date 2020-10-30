const { Command } = require("discord-akairo");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

class testcommands extends Command {
  constructor() {
    super("test", {
      aliases: ["test"],
      split: "sticky",
      ownerOnly: true
    });
  }

  async exec(message, client) {


  }
}
module.exports = testcommands;
