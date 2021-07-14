const Discord = require('discord.js');
const fetch = require('node-fetch');

const { botColor } = require('../../config.json');

module.exports = {
  name: 'github',
  aliases: ['name'],
  category: 'api',
  description: 'Получить данные пользователя из Github',

  run: async (client, message, args) => {
    fetch(`https://api.github.com/users/${args.join('%20')}`)
    .then(response => response.json())
    .then(response => {
      const Embed = new Discord.MessageEmbed()
        .setColor(botColor)
        .setTitle(response.name)
        .setURL(response.html_url)
        .setDescription(response.login)
        .setThumbnail(response.avatar_url)
        .addFields(
          { name: 'Биография', value: response.bio, inline: true },
          { name: 'Тип аккаунта', value: response.type, inline: true },
          { name: 'Репозитории', value: response.public_repos, inline: true },
          { name: 'Gists', value: response.public_gists, inline: true },
          { name: 'Местоположение', value: response.location, inline: true },            
          { name: 'Twitter', value: response.twitter_username, inline: true },  
          { name: 'Блог', value: response.blog, inline: true },
          { name: 'Дата создания', value: response.created_at, inline: true }
        )
        .setTimestamp()
      message.channel.send(Embed);
    })
  }
}