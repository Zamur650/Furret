module.exports = {
  name: 'leave',
  category: 'music',
  description: 'Выйти из голосового канала',

  run: async(client, message, args) => {
    queue = [];
    connection.disconnect();
    message.channel.send('Успешно вышел из канала! :door:');
  }
}

