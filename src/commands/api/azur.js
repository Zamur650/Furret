const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
	name: "azur",
	aliases: ["name"],
	category: "api",
	description: "Get data about Azur Lane",

	run: async (client, message, args) => {
		let request = args.join("_").toLowerCase();

		let response = await (
			await fetch(
				`https://raw.githubusercontent.com/alg-wiki/wikia/master/Ships/${request}.json`
			)
		).json();

		const Embed = new Discord.MessageEmbed()
			.setColor(process.env.BOT_COLOR)
			.setTitle(response.name)
			.setURL(`https://azurlane.koumakan.jp/${request}`)
			.setDescription(response.rarity)
			.addFields(
				{ name: "ID", value: response.ID, inline: true },
				{ name: "Hull", value: response.hull, inline: true },
				{ name: "Navy", value: response.navy, inline: true },
				{ name: "Class", value: response.class, inline: true },
				{ name: "Voice acting", value: response.voiceActress, inline: true }
			)
			.setTimestamp();
		message.channel.send(Embed);
	}
};
