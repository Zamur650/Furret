const YouTube = require('youtube-sr').default;
const ytdl = require('ytdl-core');

module.exports = {
  name: 'add',
  aliases: ['link', 'name'],
  category: 'music',
  description: 'Добавить музыку с YouTube в очередь',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async(client, message, args) => {
    if (ytdl.validateURL(args[0])) {
      queue[queue.length] = args[0];
    } else {        
      YouTube.search(args.join('+'), { limit: 1 }).then(result => {
        queue[queue.length] = result;
      });  
    }
    message.channel.send(`Добавил в очередь :musical_note:`);
  }
}

