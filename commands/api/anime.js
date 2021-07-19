const Discord = require('discord.js')
const fetch = require('node-fetch')

const { botColor } = require('../../config.json')

module.exports = {
  name: 'anime',
  aliases: ['name'],
  category: 'api',
  description: 'Найти аниме',

  run: async (client, message, args) => {
    fetch(`https://kitsu.io/api/edge/anime?filter[text]=${args.join('%20')}`)
      .then(response => response.json())
      .then(response => {
        const Embed = new Discord.MessageEmbed()
          .setColor(botColor)
          .setTitle(`Имя: ${response.data[0].attributes.titles.en}`)
          .setDescription(response.data[0].attributes.description)
          .setImage(response.data[0].attributes.posterImage.original)
          .addFields(
            { name: 'Оценка', value: response.data[0].attributes.averageRating, inline: true },
            { name: 'Возвравстные ограничения', value: response.data[0].attributes.ageRating, inline: true },
            { name: 'NSFW', value: response.data[0].attributes.nsfw, inline: true },
            { name: 'Эпизоды', value: response.data[0].attributes.episodeCount, inline: true },
            { name: 'Длинна эпизодов', value: response.data[0].attributes.episodeLength, inline: true },
            { name: 'Дата выхода', value: response.data[0].attributes.startDate, inline: true }
          )
        message.channel.send(Embed)
      })
  }
}