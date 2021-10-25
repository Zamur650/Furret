const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
	name: 'github',
	aliases: ['name'],
	category: 'api',
	description: 'Get data from Github',

	run: async (client, message, args) => {
		fetch()
		let response = await (
			await fetch(`https://api.github.com/users/${args.join('%20')}`)
		).json()
		const Embed = new Discord.MessageEmbed()
			.setColor(process.env.BOT_COLOR)
			.setTitle(response.name)
			.setURL(response.html_url)
			.setDescription(response.login)
			.setThumbnail(response.avatar_url)
			.addFields(
				{ name: 'Bio', value: response.bio, inline: true },
				{ name: 'Type', value: response.type, inline: true },
				{
					name: 'Public repositories',
					value: response.public_repos,
					inline: true
				},
				{ name: 'Gists', value: response.public_gists, inline: true },
				{ name: 'Location', value: response.location, inline: true },
				{ name: 'Twitter', value: response.twitter_username, inline: true },
				{ name: 'Blog', value: response.blog, inline: true },
				{ name: 'Created at', value: response.created_at, inline: true }
			)
			.setTimestamp()
		message.channel.send(Embed)
	}
}
