const fs = require('fs')

module.exports = (client) => {
	fs.readdirSync('./src/commands/').forEach((dir) => {
		const commands = fs
			.readdirSync(`./src/commands/${dir}/`)
			.filter((file) => file.endsWith('.js'))
		for (let file of commands) {
			let pull = require(`../commands/${dir}/${file}`)
			if (pull.name) {
				client.commands.set(pull.name, pull)
			} else {
				continue
			}
			if (pull.aliases && Array.isArray(pull.aliases))
				pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name))
		}
	})
}
