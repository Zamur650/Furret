const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
  name: 'search',
  aliases: ['request'],
  category: 'api',
  description: 'Get wikipedia data',

  run: async (client, message, args) => {
    let response = await (await fetch(`https://api.duckduckgo.com/?q=${args.join('%20')}&format=json`)).json()
    
    const Embed = new Discord.MessageEmbed()
      .setColor(process.env.BOT_COLOR)
      .setTitle(`Имя: ${response.Heading}`)
      .setURL(response.AbstractURL)
      .setDescription(response.Abstract)
      .setThumbnail(`https://api.duckduckgo.com/${response.Image}`)
    message.channel.send(Embed)
  }
}