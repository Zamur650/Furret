const Discord = require('discord.js');
const fetch = require('node-fetch');
const FormData = require('form-data');

module.exports = {
  name: 'tcgdex',
  aliases: ['name'],
  category: 'api',
  description: 'Узнать информацию о карте из TCG',

  run: async (client, message, args) => {
    fetch(`https://api.pokemontcg.io/v2/cards?q=name:${args.join('&%20').toLowerCase()}`)
      .then(response => response.json())
      .then(response => {
        message.channel.send(response.data[0].images.large);
      });
  }
}