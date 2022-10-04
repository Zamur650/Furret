module.exports = {
	name: "leave",
	category: "music",
	description: "Exit the voice channel",

	run: async (client, message) => {
		global.queue = [];
		global.connection.disconnect();
		message.channel.send("Successfully quit the channel! :door:");
	}
};
