module.exports = {
  name: 'start',
  category: 'music',
  description: 'Запустить музыку из очереди',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async(client, message, args) => {
    play(queue, message);
  }
}