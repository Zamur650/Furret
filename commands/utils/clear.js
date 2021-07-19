module.exports = {
  name: 'clear',
  aliases: ['amount'],
  category: 'utils',
  description: 'Очистка сообщений',

  run: async(client, message, args) => {
    let amount = args[0]

    if (!amount) amount = 100
    if (isNaN(amount)) return message.channel.send('Это не число!')

    if (amount > 100) return message.channel.send('Вы не можете удалить 100 сообщений за раз! :no_entry_sign:')
    if (amount < 1) return message.channel.send('Вы должны ввести число больше чем 1! :no_entry_sign:')

    message.channel.bulkDelete(amount)
    message.channel.send(`Удалено ${amount} сообщен(ий/ие/ия) :wastebasket:`)
  }
}