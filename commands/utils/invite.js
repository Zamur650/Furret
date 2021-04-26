module.exports = {
  name: 'invite',
  category: 'utils',
  description: 'Пригласить бота на сервер',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async(client, message, args) => {
    client.generateInvite({
      permissions: ['ADMINISTRATOR'],
    }).then(link => message.channel.send(link));
  }
}