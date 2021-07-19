const Discord = require('discord.js')
const api = require('osu-npm')

const { botColor } = require('../../config.json')

module.exports = {
  name: 'osu',
  aliases: ['name'],
  category: 'api',
  description: 'Информация о игроке из OSU!',

  run: async (client, message, args) => {
    let response = api.get_player_stats(args[0], 'osu')
    
    let embed = new Discord.MessageEmbed()
      .setColor(botColor)
      .setTitle(response.username)
      .setDescription(response.hitAccuracy)
      .addFields(
        { name: 'Игр', value: response.playCount, inline: true },
        { name: 'Всего попаданий', value: response.totalHits, inline: true },
        { name: 'Максимальное комбо', value: response.maximumCombo, inline: true },
        { name: 'Уровень', value: response.level, inline: true },
        { name: 'Прогресс до следующего уровня', value: response.progressToNextLevel, inline: true },
        { name: 'Страна', value: response.country, inline: true },
        { name: 'Ранк мира', value: response.globalRank, inline: true },
        { name: 'Ранк страны', value: response.countryRank, inline: true },
        { name: 'Время', value: response.playTime, inline: true },
        { name: 'Медали', value: response.medals, inline: true }
      )
      .setTimestamp()
    message.channel.send(embed)
  }
}