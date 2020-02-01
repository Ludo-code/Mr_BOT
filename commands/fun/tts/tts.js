module.exports = (client, message, args) => {
  message.delete({});
  if (
    ![
      "268432158262165504",
      "444494988240486401"
    ].includes(message.author.id)
  )
    return message.channel.send(
      `Tu n'as pas les permissiosn suffisante ! ${message.author} désolé a toi.`
    );
  message.channel.send(args.join(" "), { tts: true });
};
