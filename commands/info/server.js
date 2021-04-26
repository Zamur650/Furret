const Discord = require('discord.js');

const { botColor } = require('../../config.json');

module.exports = {
  name: 'server',
  category: 'info',
  description: 'Информация о сервере',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async(client, message, args) => {
    let embed = new Discord.MessageEmbed()
      .setColor(botColor)
      .setTitle('Информация о сервере')
      .setImage(message.guild.iconURL)
      .setDescription(`${message.guild}`)
      .addField('Владелец', `Владелец сервера: ${message.guild.owner}`)
      .addField('Количество участинков', `На этом сервере ${message.guild.memberCount} участников`)
      .addField('Количество смайликов', `На этом сервере ${message.guild.emojis.cache.size} смайликов`)
      .addField('Количество ролей', `На этом сервере ${message.guild.roles.cache.size} ролей`)
    message.channel.send(embed);
  }
}