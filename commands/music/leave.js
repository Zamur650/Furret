module.exports = {
  name: 'leave',
  category: 'music',
  description: 'Выйти из голосового канала',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async(client, message, args) => {
    queue = [];
    connection.disconnect();
    message.channel.send('Успешно вышел из канала! :door:');
  }
}

