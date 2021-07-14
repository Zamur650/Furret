module.exports = {
  name: 'skip',
  category: 'music',
  description: 'Пропустить музыку',

  run: async(client, message, args) => {
    queue.shift();
    message.channel.send('Пропустил :musical_note:');
    play(queue, message);
  }
}

