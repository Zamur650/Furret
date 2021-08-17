module.exports = {
  name: 'start',
  category: 'music',
  description: 'Start music from queue',

  run: async(client, message, args) => {
    play(queue, message)
  }
}