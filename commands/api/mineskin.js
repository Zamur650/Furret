const Discord = require('discord.js')
const fetch = require('node-fetch')

const { botColor, warframeLanguage } = require('../../config.json')

module.exports = {
  name: 'mineskin',
  aliases: ['name'],
  category: 'api',
  description: 'Получить данные из Warframe',

  run: async (client, message, args) => {
    let response = await (await fetch(`https://api.ashcon.app/mojang/v2/user/${args.join(' ')}`)).json()

    let usernames = ''

    response.username_history.forEach(usernameObject => {
      usernames += usernameObject.username + ' '
    })

    const Embed = new Discord.MessageEmbed()
      .setColor(botColor)
      .setTitle(response.username)
      .setDescription(`UUID: ${response.uuid}`)
      .setImage(`${response.textures.skin.url}`)
      .addFields(
        { name: 'All names', value: usernames }
      )
      .setTimestamp()

    message.channel.send(Embed)
  }
}