const Discord = require('discord.js');
const nekoLifeClient = require('nekos.life');
const ytdl = require('ytdl-core');
const Canvas = require('canvas');
const fs = require('fs');
const YouTube = require('youtube-sr').default;
const https = require('https');

const { createCanvas } = require('canvas');
const { token, prefix, welcomeChannel, backgroundWelcomeImageName, developerID, fortuneBall, webLink, twitchLink, botColor, starEmoji, warframeLanguage } = require('./config.json');

const client = new Discord.Client();
const neko = new nekoLifeClient();
let queue = [];
let connection;
let dispatcher;
let battles = [];
let inviteUrl;

let play = async (queue, message) => {  
  try {
    if (queue[0] !== undefined) {
      if (message.member.voice.channel) {
        connection = await message.member.voice.channel.join();
        dispatcher = await connection.play(ytdl(queue[0], { type: 'opus' }));

        dispatcher.on('start', () => {
          ytdl.getInfo(queue[0]).then(info => {
            message.channel.send(`Начинаю воспроизведение: ${info.videoDetails.title} :musical_note:`);
          });
        });

        dispatcher.on('finish', () => {
          message.channel.send(`Воспроизведение завершено :musical_note:`);
          queue.shift();
          play(queue, message);
        });

        dispatcher.on('error', console.error);
      } else {
        message.channel.send('Вы не в канале :no_entry_sign:');
      }
    } else {
      message.channel.send('В очереди ничего нет :no_entry_sign:');
    }
  } catch {
    message.channel.send('Ошибка :no_entry_sign:');
    return;
  }
};

client.once('ready', () => {
  console.log(`Захожу как: ${client.user.tag}!`);
  client.user.setActivity(`${prefix}help`, {
    type: 'STREAMING',
    url: twitchLink
  });

  client.generateInvite(['ADMINISTRATOR']).then(link => {
    inviteUrl = link;
  });
});

client.on('message', async message => {
  var now = new Date()

  try {
    if (!fs.existsSync(`./logs/${message.guild.name}/`)) {
      fs.mkdirSync(`./logs/${message.guild.name}/`)
    }

    console.log(`${now}, ${message.guild.name}, ${message.author.username}: ${message.content}`);
    fs.appendFile(`./logs/${message.guild.name}/logs.log`, `${now}, ${message.author.username}: ${message.content}\n`, function (error) {
      if (error) console.log(error);
    });
  } catch {
    console.log(`${message.author.username}: ${message.content}`);
  }

  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'help') {
    const Embed = new Discord.MessageEmbed()
      .setColor(botColor)
      .setTitle('Помощь')
      .setDescription(`Помощь на сервере ${message.guild.name}`)
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: `${prefix}help`, value: 'Выводит это сообщение', inline: true },
        { name: `${prefix}server`, value: 'Информация о сервере', inline: true },
        { name: `${prefix}me`, value: 'Узнать информацию о себе', inline: true },
        { name: `${prefix}password`, value: 'Генерация паролей', inline: true },
        { name: `${prefix}add (ссылка / название)`, value: 'Добавить музыку с YouTube в очередь', inline: true },
        { name: `${prefix}start`, value: 'Запустить музыку из очереди', inline: true },
        { name: `${prefix}skip`, value: 'Пропустить музыку', inline: true },
        { name: `${prefix}leave`, value: 'Выйти из голосового канала', inline: true },
        { name: `${prefix}color (цвет / random)`, value: 'Вывести цвет в формате hex (#ffffff) или rgb (rgb(255, 255, 255)) без пробелов / random (случайный цвет в формате hex (#ffffff)', inline: true },
        { name: `${prefix}pokedex или ${prefix}pokemon + имя или id покемона / имя атаки / имя способности / имя предмета`, value: 'Узнать информацию о покемоне', inline: true },
        { name: `${prefix}invite`, value: 'Пригласить бота на сервер', inline: true },
        { name: `${prefix}coin`, value: 'Подбросить монету', inline: true },
        { name: `${prefix}luckyball`, value: 'Магический шар', inline: true },
        { name: `${prefix}clear (число до 100)`, value: 'Очистка сообщений', inline: true },
        { name: `${prefix}neko`, value: 'Кошка', inline: true },
        { name: `${prefix}anime`, value: 'Команда говно гугл лудше', inline: true },
        { name: `${prefix}genshin (имя персонажа / название оружия / название набора артефактов на английском)`, value: 'Информация о персонаже / оружии / наборе артефактов', inline: true }
      )
      .setFooter(`От ${client.users.cache.find(user => user.id === developerID).username + client.users.cache.find(user => user.id === developerID).discriminator}`, client.users.cache.find(user => user.id === developerID).displayAvatarURL({ dynamic: true }));
    message.channel.send(Embed);
  } else if (command === 'server') {
    console.log()
    try {
      let embed = new Discord.MessageEmbed()
        .setColor(botColor)
        .setTitle("Информация о сервере")
        .setImage(message.guild.iconURL)
        .setDescription(`${message.guild}`)
        .addField("Владелец", `Владелец сервера: ${message.guild.owner}`)
        .addField("Количество участинков", `На этом сервере ${message.guild.memberCount} участников`)
        .addField("Количество смайликов", `На этом сервере ${message.guild.emojis.cache.size} смайликов`)
        .addField("Количество ролей", `На этом сервере ${message.guild.roles.cache.size} ролей`)
      message.channel.send(embed)
    } catch {
      message.channel.send('Это не сервер :no_entry_sign:');
    }
  } else if (command === 'me') {
    try {
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
        .setTitle(`Имя: ${message.author.username}#${message.author.discriminator}`)
        .setURL()
        .setDescription(`Участник сервера: ${message.guild.name}`)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .addFields(
          { name: 'Канал', value: channelEmbed },
          { name: 'Статус', value: status },
          { name: 'Id', value: message.author.id }
        )
      message.channel.send(Embed);
    }
    catch {
      message.channel.send('Это не сервер!');
    }
  } else if (command === 'password') {
    let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0, n = charset.length; i < 8; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    message.channel.send(`Пароль: ||${password}|| :keyboard:`);
  } else if (command === 'color') {    
    let canvas = createCanvas(500, 500);
    let ctx = canvas.getContext('2d');

    let hexCharset = 'ABCDEF0123456789';
    let colorHex = args.join('');
    if (colorHex === 'random') {
      colorHex = '#';
      for (let i = 0, n = hexCharset.length; i < 6; ++i) {
        colorHex += hexCharset.charAt(Math.floor(Math.random() * n));
      }
    }

    ctx.fillStyle = colorHex;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '30px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(colorHex, 250, 200);
    ctx.font = '30px Arial';
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.fillText(colorHex, 250, 300);
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'ColorHexSend.png');
    message.channel.send(colorHex, attachment);
  } else if (command === 'pokedex' || command === 'pokemon') {  
    https.get('https://play.pokemonshowdown.com/data/pokedex.js?4076b733/', (json) => {
      let body = '';

      json.on('data', (chunk) => {
        body += chunk;
      });

      json.on('end', () => {
        try {
          eval(body);

          let response;
          if (parseInt(args[0]).toString() === args[0]) {
            for (i in Object.keys(exports.BattlePokedex)) {
              if (exports.BattlePokedex[Object.keys(exports.BattlePokedex)[i]].num.toString() === args[0]) {
                response = exports.BattlePokedex[Object.keys(exports.BattlePokedex)[i]];
                break;
              }
            }
          } else {
            response = exports.BattlePokedex[args.join('').split('-').join('').toLowerCase()];
          }

          let type = '';
          let abilities = '';
          let eggGroups = '';

          if (response.types[1] !== undefined) {
            type = response.types[0] + '/' + response.types[1];
          } else {
            type = response.types[0];
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
            .addFields(
              { name: 'Рост', value: response.heightm, inline: true },
              { name: 'Вес', value: response.weightkg, inline: true },
              { name: 'TOTAL', value: response.baseStats.hp + response.baseStats.atk + response.baseStats.def + response.baseStats.spa + response.baseStats.spd + response.baseStats.spe, inline: true },
              { name: 'HP', value: response.baseStats.hp, inline: true },
              { name: 'ATK', value: response.baseStats.atk, inline: true },
              { name: 'DEF', value: response.baseStats.def, inline: true },
              { name: 'SPATK', value: response.baseStats.spa, inline: true  },
              { name: 'SPDEF', value: response.baseStats.spd, inline: true },
              { name: 'SPEED', value: response.baseStats.spe, inline: true },
              { name: 'Abilities', value: abilities, inline: true },
              { name: 'Egg groups', value: eggGroups, inline: true }
          )

          if (response.prevo !== undefined) {
            Embed.addFields(
              { name: 'Prevo', value: response.prevo, inline: true }
            )
          } if (response.evoLevel !== undefined) {
            Embed.addFields(
              { name: 'Evo Level', value: response.evoLevel, inline: true }
            )
          } if (response.evoType !== undefined) {
            Embed.addFields(
              { name: 'Evo type', value: response.evoType, inline: true }
            )
          } if (response.evoCondition !== undefined) {
            Embed.addFields(
              { name: 'Evo condition', value: response.evoCondition, inline: true }
            )
          } if (response.evoItem !== undefined) {
            Embed.addFields(
              { name: 'Evo item', value: response.evoItem, inline: true }
            )
          } if (response.evos !== undefined) {
            let evos = '';

            for (i in response.evos) {
              evos += `${response.evos[i]}\n`;
            }

            Embed.addFields(
              { name: 'Evos', value: evos, inline: true }
            )
          } if (response.otherFormes !== undefined) {
            let otherFormes = '';

            for (i in response.otherFormes) {
              otherFormes += `${response.otherFormes[i]}\n`;
            }

            Embed.addFields(
              { name: 'Other formes', value: otherFormes, inline: true }
            )
          } if (response.cannotDynamax === undefined) {
            gmax = true
          } else {
            gmax = false
          }
          Embed.addFields(              
            { name: 'Can G-MAX', value: gmax, inline: true }
          )
          
          Embed.addFields(
            { name: 'Tier', value: response.tier, inline: true }
          )

          message.channel.send(Embed);
        } catch {
          https.get('https://play.pokemonshowdown.com/data/moves.js?2e0bee6d/', (json) => {
            let body = '';

            json.on('data', (chunk) => {
              body += chunk;
            });

            json.on('end', () => {
              try {
                eval(body);

                response = exports.BattleMovedex[args.join('').split('-').join('').toLowerCase()];

                const Embed = new Discord.MessageEmbed()
                  .setColor(botColor)
                  .setTitle(`Имя: ${args.join(' ').split('-').join(' ').toLowerCase()}, ID: ${response.num}`)
                  .setDescription(response.shortDesc)
                  .addFields(
                    { name: 'Тип', value: response.type, inline: true },
                    { name: 'Вид', value: response.category, inline: true },
                    { name: 'Урон', value: response.basePower, inline: true },
                    { name: 'Точность', value: response.accuracy, inline: true },
                    { name: 'PP', value: response.pp, inline: true },
                    { name: 'Приоритет', value: response.priority, inline: true },
                  )
                message.channel.send(Embed);
              } catch {
                https.get('https://play.pokemonshowdown.com/data/abilities.js?a222a0d9/', (json) => {
                  let body = '';

                  json.on('data', (chunk) => {
                    body += chunk;
                  });

                  json.on('end', () => {
                    try {
                      eval(body);

                      response = exports.BattleAbilities[args.join('').split('-').join('').toLowerCase()];

                      const Embed = new Discord.MessageEmbed()
                        .setColor(botColor)
                        .setTitle(`Имя: ${response.name}, ID: ${response.num}`)
                        .setDescription(response.shortDesc)
                      message.channel.send(Embed);
                    } catch {
                      https.get('https://play.pokemonshowdown.com/data/items.js?3b87d391/', (json) => {
                        let body = '';

                        json.on('data', (chunk) => {
                          body += chunk;
                        });

                        json.on('end', () => {
                          try {
                            eval(body);
                            response = exports.BattleItems[args.join('').split('-').join('').toLowerCase()];

                            const Embed = new Discord.MessageEmbed()
                              .setColor(botColor)
                              .setTitle(`Имя: ${response.name}, ID: ${response.num}`)
                              .setDescription(response.shortDesc)
                              .addFields(
                                { name: 'Урон для падения', value: response.fling.basePower, inline: true }
                              )
                            message.channel.send(Embed);
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
        }
      });
    });    
  } else if (command === 'anime') {
    https.get(`https://kitsu.io/api/edge/anime?filter[text]=${args.join('%20')}`, (json) => {
      let body = '';

      json.on('data', (chunk) => {
        body += chunk;
      });

      json.on('end', () => {
        try {
          const response = JSON.parse(body);
          const Embed = new Discord.MessageEmbed()
            .setColor(botColor)
            .setTitle(`Имя: ${response.data[0].attributes.titles.en}`)
            .setDescription(response.data[0].attributes.description)
            .setThumbnail(response.data[0].attributes.posterImage.original)
            .addFields(
              { name: 'Оценка', value: response.data[0].attributes.averageRating, inline: true },
              { name: 'Возвравстные ограничения', value: response.data[0].attributes.ageRatingGuide, inline: true },
              { name: 'Дата выхода', value: response.data[0].attributes.startDate.replace('-', ' '), inline: true }
            )
          message.channel.send(Embed);
        } catch {
          message.channel.send('Ошибка :no_entry_sign:')
        }
      });
    });
  } else if (command === 'search') {
    https.get(`https://api.duckduckgo.com/?q=${args.join('%20')}&format=json`, (json) => {
      let body = '';

      json.on('data', (chunk) => {
        body += chunk;
      });

      json.on('end', () => {
        try {
          const response = JSON.parse(body);          
          const Embed = new Discord.MessageEmbed()
            .setColor(botColor)
            .setTitle(`Имя: ${response.Heading}`)
            .setDescription(response.Abstract)
            .setThumbnail(`https://api.duckduckgo.com${response.Image}`)
            .addFields(
              { name: 'Оценка', value: response.data[0].attributes.averageRating, inline: true },
              { name: 'Возвравстные ограничения', value: response.data[0].attributes.ageRatingGuide, inline: true },
              { name: 'Дата выхода', value: response.data[0].attributes.startDate.replace('-', ' '), inline: true }
            )
          message.channel.send(Embed);
        } catch (err) {
          message.channel.send('Ошибка :no_entry_sign:' + err)
        }
      });
    });
  } else if (command === 'genshin') {
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
                          
                            console.log(icon)

                            message.channel.send(Embed);
                          } catch {
                            message.channel.send('Ошибка :no_entry_sign:')
                          }
                        });
                      });  
                    } catch {
                      message.channel.send('Ошибка :no_entry_sign:')
                    }
                  });
                });
              }
            });
          });
        }
      });
    });
  } else if (command === 'wf') {
    https.get(`https://api.warframestat.us/pc/${warframeLanguage}`, (json) => {
      let body = '';

      json.on('data', (chunk) => {
        body += chunk;
      });

      json.on('end', () => {
        try {
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
        } catch (err) {
          message.channel.send('Ошибка :no_entry_sign:' + err)
        }
      });
    });
  } else if (command === 'join') {
    client.emit('guildMemberAdd', message.member);
  } else if (command === 'invite') {
    message.channel.send(`Ссылка-приглашение: ${inviteUrl}`)
  } else if (command === 'coin') {
    message.channel.send('Монета подбрасывается...')
    var random = Math.floor(Math.random() * 2);
    if (random === 0) {
      message.channel.send(':eagle: Орёл!')
    } else if (random === 1) {
      message.channel.send(':coin: Решка!')
    }
  } else if (command === 'luckyball') {
    var random = Math.floor(Math.random() * 2);
    message.channel.send(fortuneBall[random])
  } else if (command === 'clear') {
    try {
      let amount = args[0];

      if (!amount) amount = 100;
      if (isNaN(amount)) return message.channel.send('Это не число!');

      if (amount > 100) return message.channel.send('Вы не можете удалить 100 сообщений за раз! :no_entry_sign:');
      if (amount < 1) return message.channel.send('Вы должны ввести число больше чем 1! :no_entry_sign:');

      message.channel.bulkDelete(amount);
      message.channel.send(`Удалено ${amount} сообщен(ий/ие/ия) :wastebasket:`)
      
    } catch {
      message.channel.send(`Вы не можете удолять сообщения старше 2 недель. Попробуйте удолить сообщения помладше :no_entry_sign:`)
    }
  } else if (command === 'neko') {
    try {
      if (message.channel.nsfw) {
        neko.nsfw.nekoGif().then(imageJson => { message.channel.send(imageJson.url); });
      } else {
        neko.sfw.neko().then(imageJson => { message.channel.send(imageJson.url); });
      }
    } catch {
      message.channel.send('Ошибка');
    }
  } else if (command === 'fight') {
    if (args[0] === 'start') {
      battles[battles.length] = {
      "first":  {
        "id": message.author.id,
        "hp": "20",
        "atk": "2",
        "def": "2"
      },
      "second":{
        "id": message.mentions.users.first().id,
        "hp": "20",
        "atk": "2",
        "def": "2"
      }
    }
      message.channel.send(`Вы начали сражение с ${message.mentions.users.first().username}!\nПервый ходит ${message.mentions.users.first().username}`);  
    }        
    else if (args[0] === 'battles') { //forDev
      message.channel.send(JSON.stringify(battles));
    } else if (args[0] === 'attack') {
      for (i in battles) {
        if (battles[i].first.id === message.author.id) {
          let rewrite = battles[i].first;
          battles[i].first = battles[i].second;
          battles[i].second = rewrite;
          battles[i].first.hp = battles[i].first.hp - battles[i].second.atk / battles[i].first.def;
          message.channel.send(`Здоровье врага: ${battles[i].first.hp}`);
          break;
        }
      }
    } else if (args[0] === 'bulk') {
      for (i in battles) {
        if (battles[i].first.id === message.author.id) {
          let rewrite = battles[i].first;
          battles[i].first = battles[i].second;
          battles[i].second = rewrite;
          battles[i].second.atk = battles[i].second.atk * 2;
          message.channel.send(`Вы повысили свою атаку!`);
          break;
        }
      }
    }
  } else if (command === 'start') {
    play(queue, message);
  } else if (command === 'add') {
    try {
      if (ytdl.validateURL(args[0])) {
        queue[queue.length] = args[0];
      } else {        
        YouTube.search(args.join('+'), { limit: 1 }).then(result => {
          queue[queue.length] = result;
        });  
      }
      message.channel.send(`Добавил в очередь :musical_note:`);
    } catch {
      message.channel.send('Ошибка :no_entry_sign:');
    }
      
  } else if (command === 'skip') {
    try {
      queue.shift();
      message.channel.send('Пропустил :musical_note:');
      play(queue, message);
    } catch {
      message.channel.send('Ошибка :no_entry_sign:');
    }
  } else if (command === 'leave') {
    try {
      queue = [];
      connection.disconnect();
      message.channel.send('Успешно вышел из канала! :door:');
    } catch {
      message.channel.send('Невозможно выйти :no_entry_sign:');
    }
  } else if (command === 'do') {
    eval(args.join(' '))
  }
});

client.on('guildMemberAdd', async member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === welcomeChannel);
  if (!channel) return;

  const canvas = Canvas.createCanvas(700, 250);
  const ctx = canvas.getContext('2d');

  const background = await Canvas.loadImage(backgroundWelcomeImageName);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.font = '35px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Привет,', canvas.width / 2.5, canvas.height / 3.5);

  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

  ctx.beginPath();
  ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
  ctx.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

  channel.send(attachment);
});

client.once('reconnecting', () => {
  console.log(`Перезашёл как: ${client.user.tag}!`);
  client.user.setActivity(`${prefix}help`);
  client.generateInvite(["ADMINISTRATOR"]).then(link => {
    inviteUrl = link;
  });
});

client.once('disconnect', () => {
  console.log(`Отключился как ${client.user.tag}!`);
});

client.on('guildMemberBoost', (member) => {
  console.log(`${member.user.tag} сделал "буст" серверу ${member.guild.name}!`);
});

client.login(token);