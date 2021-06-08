const Discord = require('discord.js');
const fetch = require('node-fetch');

const { botColor } = require('../../config.json');

module.exports = {
  name: 'azln',
  aliases: ['name'],
  category: 'utils',
  description: 'Получить данные о корабле из Azur Lane',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    let request = args.join('_')
    
    fetch(`https://github.com/alg-wiki/wikia/blob/master/Ships/${request}.json`)
    .then(response => response.json())
    .then(response => {
      const Embed = new Discord.MessageEmbed()
        .setColor(botColor)
        .setTitle(response.name)
        .setURL(`https://azurlane.koumakan.jp/${request}`)
        .setDescription(response.rarity)
        //.setThumbnail(response.avatar_url)
        .addFields(
          { name: 'ID', value: response.ID, inline: true },
          { name: 'Корпус', value: response.hull, inline: true },
          { name: 'Армия', value: response.navy, inline: true },
          { name: 'Класс', value: response.class, inline: true },
          { name: 'Озвучка', value: response.voiceActress, inline: true }
        )
        .setTimestamp()
      message.channel.send(Embed);
    })
  }
}