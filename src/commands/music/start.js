module.exports = {
	name: 'start',
	category: 'music',
	description: 'Start music from queue',

	run: async (client, message) => {
		global.play(global.queue, message)
	}
}
