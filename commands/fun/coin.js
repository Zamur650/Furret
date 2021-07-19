module.exports = {
  name : 'coin',
  category : 'fun',
  description : 'Подбросить монету',

  run : async(client, message, args) => {
    message.channel.send('Монета подбрасывается...')

    let random = Math.floor(Math.random() * 2)

    if (random === 0) message.channel.send(':eagle: Орёл!')
    if (random === 1) message.channel.send(':coin: Решка!')
  }
}