const Discord = require('discord.js');
const https = require('https');

const { botColor, starEmoji } = require('../../config.json');

module.exports = {
  name: 'genshin',
  aliases: ['name'],
  category: 'utils',
  description: 'Информация о персонаже / оружии / наборе артефактов',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    try {
      let name = args.join(' ').split(' ').join('-').toLowerCase()

      https.get(`https://api.genshin.dev/characters/${name.toLowerCase()}`, (json) => {
        let body = '';

        json.on('data', (chunk) => {
          body += chunk;
        });

        json.on('end', () => {
          try {
            const response = JSON.parse(body);

            let rarity = '';

            for (let i = 0; i < response.rarity; i++) {
              rarity += starEmoji;
            }  

            const Embed = new Discord.MessageEmbed()
              .setColor(botColor)
              .setTitle(`Имя: ${response.name}`)
              .setDescription(response.description)
              .setThumbnail(`https://rerollcdn.com/GENSHIN/Characters/${response.name.replace(' ', '%20')}.png`)
              .addFields(
                { name: 'Редкость', value: rarity, inline: true },
                { name: 'Регион', value: response.nation, inline: true },
                { name: 'День рождения', value: response.birthday.substr(response.birthday.length - 5), inline: true },
                { name: 'Созвездие', value: response.constellation, inline: true },
                { name: 'Тип', value: response.vision, inline: true },
                { name: 'Оружие', value: response.weapon, inline: true }              
              )
            message.channel.send(Embed);
          } catch {
            https.get(`https://api.genshin.dev/weapons/${name}`, (json) => {
              let body = '';

              json.on('data', (chunk) => {
                body += chunk;
              });

              json.on('end', () => {
                try {
                  const response = JSON.parse(body);

                  let rarity = '';

                  for (let i = 0; i < response.rarity; i++) {
                    rarity += starEmoji;
                  }

                  const Embed = new Discord.MessageEmbed()
                    .setColor(botColor)
                    .setTitle(`Имя: ${response.name}`)
                    .setDescription(response.passiveDesc)
                    .setThumbnail(`https://api.genshin.dev/weapons/${name}/icon.png`)
                    .addFields(
                      { name: 'Редкость', value: rarity, inline: true },
                      { name: 'Название', value: response.passiveName, inline: true },
                      { name: 'Получение', value: response.location, inline: true },
                      { name: 'Вид', value: response.type, inline: true },                    
                      { name: 'Увеличивает', value: response.subStat, inline: true },
                      { name: 'Урон', value: response.baseAttack, inline: true }
                    )
                  message.channel.send(Embed);
                } catch {
                  https.get(`https://api.genshin.dev/artifacts/${name}`, (json) => {
                    let body = '';

                    json.on('data', (chunk) => {
                      body += chunk;
                    });

                    json.on('end', () => {
                      try {
                        const response = JSON.parse(body);

                        let icon = https.get(`https://api.genshin.dev/artifacts/${name}/icon`, (json) => {
                          let body = '';

                          json.on('data', (chunk) => {
                            body += chunk;
                          });

                          json.on('end', () => {
                            try {
                              let icon = JSON.parse(body).availableImages[0];

                              let rarity = '';

                              for (let i = 0; i < response.max_rarity; i++) {
                                rarity += starEmoji;
                              }

                              const Embed = new Discord.MessageEmbed()
                                .setColor(botColor)
                                .setTitle(`Имя: ${response.name}`)
                                .setDescription(`Редкость: ${rarity}`)
                                .setThumbnail(`https://api.genshin.dev/artifacts/${name}/${icon}/`)
                                .addFields(
                                  { name: '2 бонус', value: response['2-piece_bonus'], inline: true },
                                  { name: '4 бонус', value: response['4-piece_bonus'], inline: true }
                                )

                              message.channel.send(Embed);                          
                            } catch {
                              message.channel.send('Ошибка :no_entry_sign:');
                            }
                          });
                        });  
                      } catch {
                        message.channel.send('Ошибка :no_entry_sign:');
                      }
                    });
                  });
                }
              });
            });
          }
        });
      });
    } catch {
      message.channel.send('Ошибка :no_entry_sign:');
    }
  }
}