const Discord = require('discord.js')
const https = require('https')

const { botColor } = require('../../config.json')

module.exports = {
  name: 'search',
  aliases: ['request'],
  category: 'api',
  description: 'Найти данные из википедии',

  run: async (client, message, args) => {
    let response = await (await fetch(`https://api.duckduckgo.com/?q=${args.join('%20')}&format=json`)).json()
    
    const Embed = new Discord.MessageEmbed()
      .setColor(botColor)
      .setTitle(`Имя: ${response.Heading}`)
      .setURL(response.AbstractURL)
      .setDescription(response.Abstract)
      .setThumbnail(`https://api.duckduckgo.com${response.Image}`)
    message.channel.send(Embed)
  }
}