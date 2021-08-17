module.exports = {
  name: 'skip',
  category: 'music',
  description: 'Skip music',

  run: async(client, message, args) => {
    queue.shift()
    message.channel.send('Missed :musical_note:')
    play(queue, message)
  }
}

