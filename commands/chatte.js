module.exports = (client, message) => {
  const myArray = ["test1.png", "test2.png", "test3.png"];

  const rand = myArray[Math.floor(Math.random() * myArray.length)];

  message.channel.send(rand);
};
