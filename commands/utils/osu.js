const Discord = require('discord.js');
const api = require('osu-npm');

const { botColor } = require('../../config.json');

module.exports = {
  name: 'osu',
  aliases: ['name'],
  category: 'utils',
  description: 'Информация о игроке из OSU!',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    try {
      api.get_player_stats(args[0], 'osu', response => {
        let embed = new Discord.MessageEmbed()
          .setColor(botColor)
          .setTitle(response.username)
          .setDescription(response.hitAccuracy)
          .addFields(
            { name: 'Игр', value: response.playCount },
            { name: 'Всего попаданий', value: response.totalHits },
            { name: 'Максимальное комбо', value: response.maximumCombo },
            { name: 'Уровень', value: response.level },
            { name: 'Прогресс до следующего уровня', value: response.progressToNextLevel },
            { name: 'Страна', value: response.country },
            { name: 'Ранк мира', value: response.globalRank },
            { name: 'Ранк страны', value: response.countryRank },
            { name: 'Время', value: response.playTime },
            { name: 'Медали', value: response.medals }
          )
        message.channel.send(embed);
      });
    } catch {
      message.channel.send('Ошибка :no_entry_sign:');
    }
  }
}