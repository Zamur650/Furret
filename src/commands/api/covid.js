const translate = require('@iamtraction/google-translate')
const fetch = require('node-fetch')
const Discord = require('discord.js')

module.exports = {
	name: 'covid',
	category: 'api',
	description: 'COVID-19 Tracker',

	run: async (client, message, args) => {
		// Fetch covid info
		let responseAll = await (
			await fetch('https://api.covid19api.com/summary')
		).json()

		// Make default request World
		let response = responseAll.Global
		response.Country = 'World'

		// Make request valid via translate
		let request = (
			await translate(args.join(' '), {
				to: 'en'
			})
		).text
			.split(' ')
			.join('-')
			.toLowerCase()

		// Find request
		if (args)
			responseAll.Countries.forEach((country) => {
				if (country.Slug == request) response = country
			})

		// Send result
		const Embed = new Discord.MessageEmbed()
			.setColor(process.env.BOT_COLOR)
			.setTitle(response.Country)
			.setURL('https://xn--80aesfpebagmfblc0a.xn--p1ai/')
			.addFields(
				{
					name: 'New confirmed',
					value: response.NewConfirmed,
					inline: true
				},
				{
					name: 'New deaths',
					value: response.NewDeaths,
					inline: true
				},
				{
					name: 'New recovered',
					value: response.NewRecovered,
					inline: true
				},
				{
					name: 'Total confirmed',
					value: response.TotalConfirmed,
					inline: true
				},
				{
					name: 'Total deaths',
					value: response.TotalDeaths,
					inline: true
				},
				{
					name: 'Total recovered',
					value: response.TotalRecovered,
					inline: true
				}
			)
			.setTimestamp()

		message.channel.send(Embed)
	}
}
