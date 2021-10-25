const Discord = require('discord.js')

module.exports = {
	name: 'invite',
	category: 'utils',
	description: 'Invite bot to server',

	run: async (client, message) => {
		const link = await client.generateInvite({
			permissions: ['ADMINISTRATOR']
		})

		const Embed = new Discord.MessageEmbed()
			.setColor(process.env.BOT_COLOR)
			.setTitle('Click to invite')
			.setURL(link)
		message.channel.send(Embed)
	}
}
