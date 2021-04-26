const nekoLifeClient = require('nekos.life');

const neko = new nekoLifeClient();

module.exports = {
  name: 'neko',
  category: 'fun',
  description: 'Кошка',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async(client, message, args) => {
    if (message.channel.nsfw) {
      neko.nsfw.nekoGif().then(imageJson => { message.channel.send(imageJson.url); });
    } else {
      neko.sfw.neko().then(imageJson => { message.channel.send(imageJson.url); });
    }
  }
}