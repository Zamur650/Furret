module.exports = {
  name: 'skip',
  category: 'music',
  description: 'Пропустить музыку',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async(client, message, args) => {
    queue.shift();
    message.channel.send('Пропустил :musical_note:');
    play(queue, message);
  }
}

