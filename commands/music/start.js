module.exports = {
  name: 'start',
  category: 'music',
  description: 'Запустить музыку из очереди',

  run: async(client, message, args) => {
    play(queue, message);
  }
}