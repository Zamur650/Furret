const Discord = require('discord.js')
const fetch = require('node-fetch')

const { botColor } = require('../../config.json')

module.exports = {
  name: 'azur',
  aliases: ['name'],
  category: 'api',
  description: 'Получить данные о корабле из Azur Lane',

  run: async (client, message, args) => {
    let request = args.join('_').toLowerCase()

    let response = await (await fetch(`https://raw.githubusercontent.com/alg-wiki/wikia/master/Ships/${request}.json`)).json()

    const Embed = new Discord.MessageEmbed()
      .setColor(botColor)
      .setTitle(response.name)
      .setURL(`https://azurlane.koumakan.jp/${request}`)
      .setDescription(response.rarity)
      .addFields(
        { name: 'ID', value: response.ID, inline: true },
        { name: 'Корпус', value: response.hull, inline: true },
        { name: 'Армия', value: response.navy, inline: true },
        { name: 'Класс', value: response.class, inline: true },
        { name: 'Озвучка', value: response.voiceActress, inline: true }
      )
      .setTimestamp()
    message.channel.send(Embed)
  }
}