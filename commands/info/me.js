const Discord = require('discord.js');

const { botColor } = require('../../config.json');

module.exports = {
  name: 'me',
  category: 'info',
  description: 'Узнать информацию о себе',

  run: async(client, message, args) => {      
    let channelEmbed = message.member.voice.channel;
    let status = message.author.presence.status;
    switch (status) {
      case 'online':
        status = ':green_circle: В сети';
        break;
      case 'idle':
        status = ':crescent_moon: Не активен';
        break;
      case 'dnd':
        status = ':red_circle: Не беспокоить';
        break;
      case 'offline':
        status = ':black_circle: Не в сети';
        break;
    }
    if (channelEmbed === null) {
      channelEmbed = 'Не в канале';
    }
    const Embed = new Discord.MessageEmbed()
      .setColor(botColor)
      .setTitle(`${message.author.username}#${message.author.discriminator}`)
      .setDescription(`Участник сервера: ${message.guild.name}`)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: 'Канал', value: channelEmbed },
        { name: 'Статус', value: status },
        { name: 'Id', value: message.author.id }
      )
      .setTimestamp()
    message.channel.send(Embed);    
  }
}

