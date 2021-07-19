const nekoLifeClient = require('nekos.life')

const neko = new nekoLifeClient()

module.exports = {
  name: 'neko',
  category: 'fun',
  description: 'Кошка',

  run: async(client, message, args) => {
    if (message.channel.nsfw) {
      image = (await neko.nsfw.nekoGif()).url
    } else {
      image = (await neko.sfw.neko()).url
    }

    message.channel.send(image)
  }
}