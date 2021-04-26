const Discord = require('discord.js');
const https = require('https');

const { botColor, warframeLanguage } = require('../../config.json');

module.exports = {
  name: 'warframe',
  category: 'utils',
  description: 'Получить данные из Warframe',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    https.get(`https://api.warframestat.us/pc/${warframeLanguage}`, (json) => {
      let body = '';

      json.on('data', (chunk) => {
        body += chunk;
      });

      json.on('end', () => {
        const response = JSON.parse(body);

        const Embed = new Discord.MessageEmbed()
          .setColor(botColor)
          .setTitle(`Warframe`)
          .setDescription(response.news[0].message)            
          .addFields(
            { name: 'Скидка', value: `${response.dailyDeals[0].item}: ~~${response.dailyDeals[0].originalPrice}~~ - ${response.dailyDeals[0].salePrice}. До ${response.dailyDeals[0].endString}` }
        )
        
        if (response.voidTrader.active === false) {
          Embed.addFields(
            { name: 'Торговец', value: `Появится ${response.voidTrader.startString}, ${response.voidTrader.location}` }
          )
        } else {
          Embed.addFields(
            { name: 'Торговец', value: `Исчезнет ${response.voidTrader.endString}, ${response.voidTrader.location}` }
          )
        }          

        message.channel.send(Embed);
      });
    });
  }
}