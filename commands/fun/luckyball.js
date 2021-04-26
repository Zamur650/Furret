const { fortuneBall } = require('../../config.json');

module.exports = {
  name: 'luckyball',
  category: 'fun',
  description: 'Магический шар',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async(client, message, args) => {
    let random = Math.floor(Math.random() * 2);
    message.channel.send(fortuneBall[random])
  }
}