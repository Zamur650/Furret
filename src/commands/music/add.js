const YouTube = require("youtube-sr").default;
const ytdl = require("ytdl-core");

module.exports = {
	name: "add",
	aliases: ["link", "name"],
	category: "music",
	description: "Add YouTube Music to Queue",

	run: async (client, message, args) => {
		if (ytdl.validateURL(args[0])) {
			global.queue[global.queue.length] = args[0];
		} else {
			YouTube.search(args.join("+"), { limit: 1 }).then((result) => {
				global.queue[global.queue.length] = result;
			});
		}
		message.channel.send("Добавил в очередь :musical_note:");
	}
};
