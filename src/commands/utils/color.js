const Discord = require('discord.js')
const Canvas = require('canvas')

module.exports = {
	name: 'color',
	aliases: ['data'],
	category: 'utils',
	description:
		'Output color in hex (#ffffff) / rgb (rgb (255, 255, 255)) / other / random (random color in hex (#ffffff)',

	run: async (client, message, args) => {
		let canvas = Canvas.createCanvas(500, 500)
		let ctx = canvas.getContext('2d')

		let hexCharset = 'ABCDEF0123456789'
		let colorHex = args.join('')
		if (colorHex === 'random') {
			colorHex = '#'
			for (let i = 0, n = hexCharset.length; i < 6; ++i) {
				colorHex += hexCharset.charAt(Math.floor(Math.random() * n))
			}
		}

		ctx.fillStyle = colorHex
		ctx.fillRect(0, 0, canvas.width, canvas.height)
		ctx.font = '30px Arial'
		ctx.fillStyle = '#ffffff'
		ctx.textAlign = 'center'
		ctx.fillText(colorHex, 250, 200)
		ctx.font = '30px Arial'
		ctx.fillStyle = '#000000'
		ctx.textAlign = 'center'
		ctx.fillText(colorHex, 250, 300)
		const attachment = new Discord.MessageAttachment(
			canvas.toBuffer(),
			'ColorHexSend.png'
		)
		message.channel.send(colorHex, attachment)
	}
}
