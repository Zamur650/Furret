module.exports = {
  name: "leave",
  category: "music",
  description: "Exit the voice channel",

  run: async (client, message, args) => {
    queue = [];
    connection.disconnect();
    message.channel.send("Successfully quit the channel! :door:");
  },
};
