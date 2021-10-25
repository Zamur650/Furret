module.exports = {
	name: 'skip',
	category: 'music',
	description: 'Skip music',

	run: async (client, message) => {
		global.queue.shift()
		message.channel.send('Missed :musical_note:')
		global.play(global.queue, message)
	}
}
