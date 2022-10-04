const nekoLifeClient = require("nekos.life");

const neko = new nekoLifeClient();

module.exports = {
	name: "neko",
	category: "fun",
	description: "Get neko image",

	run: async (client, message) => {
		let image = (await neko.sfw.neko()).url;

		message.channel.send(image);
	}
};
