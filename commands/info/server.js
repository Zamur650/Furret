const Discord = require('discord.js')

const { botColor } = require('../../config.json')

module.exports = {
  name: 'server',
  category: 'info',
  description: 'Информация о сервере',

  run: async(client, message, args) => {
    let embed = new Discord.MessageEmbed()
      .setColor(botColor)
      .setTitle('Информация о сервере')
      .setThumbnail(`https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`)
      .setDescription(message.guild)
      .addFields(
        { name: 'Владелец', value: message.guild.owner },
        { name: 'Количество участинков', value: message.guild.memberCount },
        { name: 'Количество смайликов', value: message.guild.emojis.cache.size },
        { name: 'Количество ролей', value: message.guild.roles.cache.size },
        { name: 'ID', value: message.guild.id }
      )
    message.channel.send(embed)
  }
}