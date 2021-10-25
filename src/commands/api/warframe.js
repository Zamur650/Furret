const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
	name: 'warframe',
	category: 'api',
	description: 'Get warframe data',

	run: async (client, message) => {
		let response = await (
			await fetch(
				`https://api.warframestat.us/pc/${process.env.WARFRAME_LANGUAGE}`
			)
		).json()

		const Embed = new Discord.MessageEmbed()
			.setColor(process.env.BOT_COLOR)
			.setTitle('Warframe')
			.setDescription(response.news[0].message)
			.addFields({
				name: 'Sale',
				value: `${response.dailyDeals[0].item}: ~~${response.dailyDeals[0].originalPrice}~~ - ${response.dailyDeals[0].salePrice}. Before ${response.dailyDeals[0].endString}`
			})
			.setTimestamp()

		if (response.voidTrader.active == false) {
			Embed.addFields({
				name: 'Trader',
				value: `Start ${response.voidTrader.startString}, ${response.voidTrader.location}`
			})
		} else {
			Embed.addFields({
				name: 'Trader',
				value: `End ${response.voidTrader.endString}, ${response.voidTrader.location}`
			})
		}

		message.channel.send(Embed)
	}
}
