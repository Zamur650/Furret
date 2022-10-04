const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
	name: "anime",
	aliases: ["name"],
	category: "api",
	description: "Find anime",

	run: async (client, message, args) => {
		fetch(`https://kitsu.io/api/edge/anime?filter[text]=${args.join("%20")}`)
			.then((response) => response.json())
			.then((response) => {
				const Embed = new Discord.MessageEmbed()
					.setColor(process.env.BOT_COLOR)
					.setTitle(`Имя: ${response.data[0].attributes.titles.en}`)
					.setDescription(response.data[0].attributes.description)
					.setImage(response.data[0].attributes.posterImage.original)
					.addFields(
						{
							name: "Rating",
							value: response.data[0].attributes.averageRating,
							inline: true
						},
						{
							name: "Age rating",
							value: response.data[0].attributes.ageRating,
							inline: true
						},
						{
							name: "NSFW",
							value: response.data[0].attributes.nsfw,
							inline: true
						},
						{
							name: "Episode count",
							value: response.data[0].attributes.episodeCount,
							inline: true
						},
						{
							name: "Episode length",
							value: response.data[0].attributes.episodeLength,
							inline: true
						},
						{
							name: "Start date",
							value: response.data[0].attributes.startDate,
							inline: true
						}
					);
				message.channel.send(Embed);
			});
	}
};
