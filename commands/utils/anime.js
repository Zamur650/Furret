const Discord = require('discord.js');
const https = require('https');

const { botColor } = require('../../config.json');

module.exports = {
  name: 'anime',
  aliases: ['name'],
  category: 'utils',
  description: 'Найти аниме',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    try {
      https.get(`https://kitsu.io/api/edge/anime?filter[text]=${args.join('%20')}`, (json) => {
        let body = '';

        json.on('data', (chunk) => {
          body += chunk;
        });

        json.on('end', () => {
          const response = JSON.parse(body);
          const Embed = new Discord.MessageEmbed()
            .setColor(botColor)
            .setTitle(`Имя: ${response.data[0].attributes.titles.en}`)
            .setDescription(response.data[0].attributes.description)
            .setThumbnail(response.data[0].attributes.posterImage.original)
            .addFields(
              { name: 'Оценка', value: response.data[0].attributes.averageRating, inline: true },
              { name: 'Возвравстные ограничения', value: response.data[0].attributes.ageRatingGuide, inline: true },
              { name: 'Дата выхода', value: response.data[0].attributes.startDate.replace('-', ' '), inline: true }
            )
          message.channel.send(Embed);
        });
      });
    } catch {
      message.channel.send('Ошибка :no_entry_sign:')
    }
  }
}