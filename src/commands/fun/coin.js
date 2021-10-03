module.exports = {
  name: "coin",
  category: "fun",
  description: "Flip a coin",

  run: async (client, message, args) => {
    let messages = [":coin: Tail!", ":eagle: Eagle!"];
    let random = Math.floor(Math.random() * 2);

    message.channel.send(messages[random]);
  },
};
