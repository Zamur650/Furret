const Discord = require('discord.js')
const fetch = require('node-fetch')

const { botColor, starEmoji } = require('../../config.json')

module.exports = {
  name: 'genshin',
  aliases: ['name'],
  category: 'api',
  description: 'Информация о персонаже / оружии / наборе артефактов',

  run: async (client, message, args) => {
    //console.time()

    try {
      let name = args.join(' ').split(' ').join('-').toLowerCase()

      let response = await (await fetch(`https://api.genshin.dev/characters/${name.toLowerCase()}`)).json()
      try {
        let rarity = ''

        for (let i = 0; i < response.rarity; i++) {
          rarity += starEmoji
        }

        const Embed = new Discord.MessageEmbed()
          .setColor(botColor)
          .setTitle(`Имя: ${response.name}`)
          .setDescription(response.description)
          .setThumbnail(`https://api.genshin.dev/characters/${name}/icon.png`)
          .addFields({
            name: 'Редкость',
            value: rarity,
            inline: true
          }, {
            name: 'Регион',
            value: response.nation,
            inline: true
          }, {
            name: 'День рождения',
            value: response.birthday.substr(response.birthday.length - 5),
            inline: true
          }, {
            name: 'Созвездие',
            value: response.constellation,
            inline: true
          }, {
            name: 'Тип',
            value: response.vision,
            inline: true
          }, {
            name: 'Оружие',
            value: response.weapon,
            inline: true
          })
        message.channel.send(Embed)
        //console.timeEnd()
      } catch {
        let response = await (await fetch(`https://api.genshin.dev/weapons/${name}`)).json()
        try {
          let rarity = ''

          for (let i = 0; i < response.rarity; i++) {
            rarity += starEmoji
          }

          const Embed = new Discord.MessageEmbed()
            .setColor(botColor)
            .setTitle(`Имя: ${response.name}`)
            .setDescription(response.passiveDesc)
            .setThumbnail(`https://api.genshin.dev/weapons/${name}/icon.png`)
            .addFields({
              name: 'Редкость',
              value: rarity,
              inline: true
            }, {
              name: 'Название',
              value: response.passiveName,
              inline: true
            }, {
              name: 'Получение',
              value: response.location,
              inline: true
            }, {
              name: 'Вид',
              value: response.type,
              inline: true
            }, {
              name: 'Увеличивает',
              value: response.subStat,
              inline: true
            }, {
              name: 'Урон',
              value: response.baseAttack,
              inline: true
            })
          message.channel.send(Embed)
        } catch {
          let response = await (await fetch(`https://api.genshin.dev/artifacts/${name}`)).json()

          try {
            let rarity = ''

            for (let i = 0; i < response.max_rarity; i++) {
              rarity += starEmoji
            }

            const Embed = new Discord.MessageEmbed()
              .setColor(botColor)
              .setTitle(`Имя: ${response.name}`)
              .setDescription(`Максимальная редкость: ${rarity}`)
              .setThumbnail(`https://api.genshin.dev/artifacts/${name}/flower-of-life.png`)
              .addFields({
                name: '2 бонус',
                value: response['2-piece_bonus'],
                inline: true
              }, {
                name: '4 бонус',
                value: response['4-piece_bonus'],
                inline: true
              })

            message.channel.send(Embed)
          } catch {
            message.channel.send('Ошибка :no_entry_sign:')
          }
        }
      }
    } catch {
      message.channel.send('Ошибка :no_entry_sign:')
    }
  }
}