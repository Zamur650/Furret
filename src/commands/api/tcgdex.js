const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
	name: "tcgdex",
	aliases: ["name"],
	category: "api",
	description: "Get pokemon card data TCG",

	run: async (client, message, args) => {
		let response = await (
			await fetch(
				`https://api.pokemontcg.io/v2/cards?q=name:${args
					.join("&%20")
					.toLowerCase()}`
			)
		).json();

		const Embed = new Discord.MessageEmbed()
			.setColor(process.env.BOT_COLOR)
			.setTitle(`${response.data[0].supertype}: ${response.data[0].name}`)
			.setDescription(
				`${response.data[0].set.series}: ${response.data[0].set.name}`
			)
			.setThumbnail(response.data[0].set.images.symbol)
			.addFields(
				{
					name: "Release date",
					value: response.data[0].set.releaseDate,
					inline: true
				},
				{
					name: "Rarity",
					value: response.data[0].rarity,
					inline: true
				}
			)
			.setImage(response.data[0].images.large);

		message.channel.send(Embed);
	}
};
