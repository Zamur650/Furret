module.exports = {
  name : 'coin',
  category : 'fun',
  description : 'Подбросить монету',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run : async(client, message, args) => {
    message.channel.send('Монета подбрасывается...')
    var random = Math.floor(Math.random() * 2);
    if (random === 0) {
      message.channel.send(':eagle: Орёл!')
    } else if (random === 1) {
      message.channel.send(':coin: Решка!')
    }
  }
}