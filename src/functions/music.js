const ytdl = require('ytdl-core')

global.queue = []
global.connection
global.dispatcher

global.play = async (queue, message) => {
	if (queue[0] == undefined)
		return message.channel.send('В очереди ничего нет :no_entry_sign:')
	if (!message.member.voice.channel)
		return message.channel.send('Вы не в канале :no_entry_sign:')

	const connection = await message.member.voice.channel.join()
	const dispatcher = await connection.play(ytdl(queue[0], { type: 'opus' }))

	dispatcher.on('start', async () => {
		const info = await ytdl.getInfo(queue[0])

		message.channel.send(
			`Начинаю воспроизведение: ${info.videoDetails.title} :musical_note:`
		)
	})

	dispatcher.on('finish', async () => {
		queue.shift()
		message.channel.send('Воспроизведение завершено :musical_note:')
		global.play(queue, message)
	})

	dispatcher.on('error', console.error)
}
