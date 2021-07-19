const Discord = require('discord.js')
const fetch = require('node-fetch')

const { botColor } = require('../../config.json')

module.exports = {
  name: 'pokedex',
  aliases: ['name'],
  category: 'api',
  description: 'Узнать информацию о покемоне / атаке / способности / предмете',

  run: async (client, message, args) => {
    let script = await (await fetch('https://play.pokemonshowdown.com/data/pokedex.js?4076b733/')).text()
    try {
      eval(script)

      let response
      if (parseInt(args[0]).toString() === args[0]) {
        for (i in Object.keys(exports.BattlePokedex)) {
          if (exports.BattlePokedex[Object.keys(exports.BattlePokedex)[i]].num.toString() === args[0]) {
            response = exports.BattlePokedex[Object.keys(exports.BattlePokedex)[i]]
            break
          }
        }
      } else {
        response = exports.BattlePokedex[args.join('').split('-').join('').toLowerCase()]
      }

      let type = ''
      let abilities = ''
      let eggGroups = ''

      if (response.types[1] !== undefined) {
        type = response.types[0] + '/' + response.types[1]
      } else {
        type = response.types[0]
      }

      for (i in response.abilities) {
        abilities += `${response.abilities[i]}\n`
      }

      for (i in response.eggGroups) {
        eggGroups += `${response.eggGroups[i]}\n`
      }

      const Embed = new Discord.MessageEmbed()
        .setColor(botColor)
        .setTitle(`Имя: ${response.name}, ID: ${response.num}`)
        .setDescription(`Тип: ${type}`)
        .setThumbnail(`https://play.pokemonshowdown.com/sprites/ani/${response.name.replace('-Y', 'y').replace('-X', 'x').toLowerCase()}.gif`)
        .addFields({
          name: 'Рост',
          value: response.heightm,
          inline: true
        }, {
          name: 'Вес',
          value: response.weightkg,
          inline: true
        }, {
          name: 'TOTAL',
          value: response.baseStats.hp + response.baseStats.atk + response.baseStats.def + response.baseStats.spa + response.baseStats.spd + response.baseStats.spe,
          inline: true
        }, {
          name: 'HP',
          value: response.baseStats.hp,
          inline: true
        }, {
          name: 'ATK',
          value: response.baseStats.atk,
          inline: true
        }, {
          name: 'DEF',
          value: response.baseStats.def,
          inline: true
        }, {
          name: 'SPATK',
          value: response.baseStats.spa,
          inline: true
        }, {
          name: 'SPDEF',
          value: response.baseStats.spd,
          inline: true
        }, {
          name: 'SPEED',
          value: response.baseStats.spe,
          inline: true
        }, {
          name: 'Abilities',
          value: abilities,
          inline: true
        }, {
          name: 'Egg groups',
          value: eggGroups,
          inline: true
        })

      if (response.prevo !== undefined) {
        Embed.addFields({
          name: 'Prevo',
          value: response.prevo,
          inline: true
        })
      }
      if (response.evoLevel !== undefined) {
        Embed.addFields({
          name: 'Evo Level',
          value: response.evoLevel,
          inline: true
        })
      }
      if (response.evoType !== undefined) {
        Embed.addFields({
          name: 'Evo type',
          value: response.evoType,
          inline: true
        })
      }
      if (response.evoCondition !== undefined) {
        Embed.addFields({
          name: 'Evo condition',
          value: response.evoCondition,
          inline: true
        })
      }
      if (response.evoItem !== undefined) {
        Embed.addFields({
          name: 'Evo item',
          value: response.evoItem,
          inline: true
        })
      }
      if (response.evos !== undefined) {
        let evos = ''

        for (i in response.evos) {
          evos += `${response.evos[i]}\n`
        }

        Embed.addFields({
          name: 'Evos',
          value: evos,
          inline: true
        })
      }
      if (response.otherFormes !== undefined) {
        let otherFormes = ''

        for (i in response.otherFormes) {
          otherFormes += `${response.otherFormes[i]}\n`
        }

        Embed.addFields({
          name: 'Other formes',
          value: otherFormes,
          inline: true
        })
      }
      if (response.cannotDynamax === undefined) {
        gmax = true
      } else {
        gmax = false
      }
      Embed.addFields({
        name: 'Can G-MAX',
        value: gmax,
        inline: true
      })

      Embed.addFields({
        name: 'Tier',
        value: response.tier,
        inline: true
      })

      message.channel.send(Embed)
    } catch {
      let script = await (await fetch('https://play.pokemonshowdown.com/data/moves.js?2e0bee6d/')).text()
      try {
        eval(script)

        response = exports.BattleMovedex[args.join('').split('-').join('').toLowerCase()]

        const Embed = new Discord.MessageEmbed()
          .setColor(botColor)
          .setTitle(`Имя: ${args.join(' ').split('-').join(' ').toLowerCase()}, ID: ${response.num}`)
          .setDescription(response.shortDesc)
          .addFields({
            name: 'Тип',
            value: response.type,
            inline: true
          }, {
            name: 'Вид',
            value: response.category,
            inline: true
          }, {
            name: 'Урон',
            value: response.basePower,
            inline: true
          }, {
            name: 'Точность',
            value: response.accuracy,
            inline: true
          }, {
            name: 'PP',
            value: response.pp,
            inline: true
          }, {
            name: 'Приоритет',
            value: response.priority,
            inline: true
          }, )
        message.channel.send(Embed)
      } catch {
        let script = await (await fetch('https://play.pokemonshowdown.com/data/abilities.js?a222a0d9/')).text()
        try {
          eval(script)

          response = exports.BattleAbilities[args.join('').split('-').join('').toLowerCase()]

          const Embed = new Discord.MessageEmbed()
            .setColor(botColor)
            .setTitle(`Имя: ${response.name}, ID: ${response.num}`)
            .setDescription(response.shortDesc)
          message.channel.send(Embed)
        } catch {
          let script = await (await fetch('https://play.pokemonshowdown.com/data/items.js?3b87d391/')).text()

          try {
            eval(script)
            response = exports.BattleItems[args.join('').split('-').join('').toLowerCase()]

            const Embed = new Discord.MessageEmbed()
              .setColor(botColor)
              .setTitle(`Имя: ${response.name}, ID: ${response.num}`)
              .setDescription(response.shortDesc)
              .addFields({
                name: 'Урон для падения',
                value: response.fling.basePower,
                inline: true
              })
            message.channel.send(Embed)
          } catch {
            message.channel.send('Ошибка :no_entry_sign:')
          }
        }
      }
    }
  }
}