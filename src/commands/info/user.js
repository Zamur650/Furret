const Discord = require('discord.js')

module.exports = {
	name: 'user',
	aliases: ['ping'],
	category: 'info',
	description: 'Find out information about selected user',

	run: async (client, message) => {
		let mentioned = message.mentions.users.first()

		let user,
			status = undefined

		if (mentioned) user = mentioned
		if (!mentioned) user = message.author

		let channelEmbed = message.guild.members.cache.get(user.id).voice.channel

		if (user.presence.status == 'offline') status = ':black_circle: Offline'
		if (user.presence.status == 'online') status = ':green_circle: Online'
		if (user.presence.status == 'idle') status = ':crescent_moon: Not active'
		if (user.presence.status == 'dnd') status = ':red_circle: Do not disturb'

		if (channelEmbed == null) channelEmbed = 'Not in the channel'

		const Embed = new Discord.MessageEmbed()
			.setColor(process.env.BOT_COLOR)
			.setTitle(`${user.username}#${user.discriminator}`)
			.setDescription(`Server member: ${message.guild.name}`)
			.setThumbnail(
				`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
			)
			.addFields(
				{ name: 'Channel', value: channelEmbed },
				{ name: 'Status', value: status },
				{ name: 'Id', value: user.id }
			)
			.setTimestamp()

		message.channel.send(Embed)
	}
}
