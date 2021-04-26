const Discord = require('discord.js');
const https = require('https');

const { botColor } = require('../../config.json');

module.exports = {
  name: 'search',
  aliases: ['request'],
  category: 'utils',
  description: 'Найти данные из википедии',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    try {
      https.get(`https://api.duckduckgo.com/?q=${args.join('%20')}&format=json`, (json) => {
        let body = '';

        json.on('data', (chunk) => {
          body += chunk;
        });

        json.on('end', () => {
          const response = JSON.parse(body);          
          const Embed = new Discord.MessageEmbed()
            .setColor(botColor)
            .setTitle(`Имя: ${response.Heading}`)
            .setURL(response.AbstractURL)
            .setDescription(response.Abstract)
            .setThumbnail(`https://api.duckduckgo.com${response.Image}`)
          message.channel.send(Embed);
        });
      });
    } catch {
      message.channel.send('Ошибка :no_entry_sign:')
    }
  }
}