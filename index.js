const Discord = require('discord.js');
const nekoLifeClient = require('nekos.life');
const ytdl = require('ytdl-core');
const Canvas = require('canvas');
const Pokedex = require("pokeapi-js-wrapper")
const fs = require("fs");

const { createCanvas } = require('canvas');
const { token, prefix, welcomeChannel, backgroundWelcomeImageName, developer, developerImage, fortuneBall } = require('./config.json');

const client = new Discord.Client();
const canvas = createCanvas(500, 500);
const ctx = canvas.getContext('2d');
const P = new Pokedex.Pokedex()

const neko = new nekoLifeClient();
let queue = [];
let battles = [];

let play = async (queue, message) => {
  try {
    if (queue[0] !== undefined) {
      if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        const dispatcher = await connection.play(ytdl(queue[0][0], { type: 'opus' }));        

        dispatcher.on('start', () => {
          message.channel.send(`Начинаю воспроизведение :musical_note:`);
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
    message.channel.send('Ошибка :no_entry_sign');
    return;
  }
};

client.once('ready', () => {
  console.log(`Захожу как: ${client.user.tag}!`);
  client.user.setActivity(`${prefix}help - help`);
  client.generateInvite(["ADMINISTRATOR"]).then(link => {
    let inviteUrl = link;
  });
});

client.on('message', async message => {
  var now = new Date();
  try {
    console.log(`${now}, ${message.guild.name}, ${message.author.username}: ${message.content}`);
    fs.appendFile("logs.log", `${now}, ${message.guild.name}, ${message.author.username}: ${message.content}\n`, function (error) {
      if (error) console.log(error);
    });
  } catch {
    console.log(`${message.author.username}: ${message.content}`);
    fs.appendFile("logs.log", `${message.author.username}: ${message.content}\n`, function (error) {
      if (error) console.log(error);
    });
  }

  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'help') {
    message.channel.send(`:page_with_curl: Помощь: \`\`\`${prefix}help -  Выводит это сообщение\n${prefix}server - Информация о сервере\n${prefix}me - Узнать информацию о себе\n${prefix}password - Генерация паролей\n${prefix}add (ссылка) - добавить музыку с YouTube в очередь\n${prefix}start - запустить музыку\n${prefix}skip - пропустить музыку\n${prefix}leave - выйти из голосового канала\n${prefix}color (цвет) - вывести цвет в формате hex (#ffffff) или rgb (rgb(0,0,0)) без пробелов или random (случайный цвет в формате hex (#ffffff)\n${prefix}pokedex или ${prefix}pokemon + (имя) или (id) покемона - узнать информацию о покемоне\n${prefix}invite - пригласить бота на сервер\n${prefix}coin - подбросить монету\n${prefix}clear (число до 100) - очистка сообщений\n${prefix}neko - кошка :)\n${prefix}info - информация о боте\`\`\``);
  } else if (command === 'server') {
    try {
      message.channel.send(`:page_with_curl: Название сервера: ${message.guild.name}\nКоличество участников: ${message.guild.memberCount}`);
    }
    catch {
      message.channel.send('Это не сервер :(');
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
        .setColor('#ffcc99')
        .setTitle(`Имя: ${message.author.username}`)
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
    let hexCharset = 'ABCDEF0123456789';
    let colorHex = args[0];
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
    try {
      P.getPokemonByName(args[0].toLowerCase()).then(response => {
        let pokemonType;
        if (response.types[0].type.name !== undefined) {
          pokemonType = `${response.types[0].type.name} / ${response.types[1].type.name}`;
        } else {
          pokemonType = response.types[0].type.name;
        }
        const Embed = new Discord.MessageEmbed()
          .setColor('#ffcc99')
          .setTitle(`Имя: ${response.name}`)
          .setDescription(pokemonType)
          .setThumbnail(response.sprites.front_default)
          .addFields(
            { name: 'ID', value: response.id },
            { name: 'total', value: response.stats[0].base_stat + response.stats[1].base_stat + response.stats[2].base_stat + response.stats[3].base_stat + response.stats[4].base_stat + response.stats[5].base_stat },
            { name: 'HP', value: response.stats[0].base_stat },
            { name: 'Атака', value: response.stats[1].base_stat },
            { name: 'Защита', value: response.stats[2].base_stat },
            { name: 'Специальная атака', value: response.stats[3].base_stat },
            { name: 'Специальная защита', value: response.stats[4].base_stat },
            { name: 'Скорость', value: response.stats[5].base_stat },
            { name: 'Рост', value: response.height },
            { name: 'Вес', value: response.weight }
          )
        message.channel.send(Embed);
      });
      } catch {
        message.channel.send('Ошибка :no_entry_sign');
      }    
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
      if (!amount) return message.channel.send('Вы не указали, сколько сообщений нужно удалить! :no_entry_sign:');
      if (isNaN(amount)) return message.channel.send('Это не число!');

      if (amount > 100) return message.channel.send('Вы не можете удалить 100 сообщений за раз! :no_entry_sign:');
      if (amount < 1) return message.channel.send('Вы должны ввести число больше чем 1! :no_entry_sign:');

      async function delete_messages() {
        await message.channel.messages.fetch({
          limit: amount
        }).then(messages => {
          message.channel.bulkDelete(messages)
          message.channel.send(`Удалено ${amount} сообщений! :wastebasket:`)
        })
      };
      delete_messages();
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
  } else if (command === 'info') {
      try {
        let status = client.user.presence.status;
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
        const Embed = new Discord.MessageEmbed()
          .setColor('#ffcc99')
          .setTitle(`Имя: ${client.user.tag}`)
          .setURL()
          .setDescription(`На сревере: ${message.guild.name}`)
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
          .addFields(
            { name: 'Статус', value: status },
            { name: 'Id', value: client.user.id }
        )
          .setFooter(`От ${developer}`, developerImage);
        message.channel.send(Embed);
      }
      catch (err) {
        message.channel.send('Это не сервер!' + err);
      }
  } else if (command === 'fight') {
    if (args[0] === 'start') {
      battles[battles.length] = {
      "first":  {
        "id": message.author.id,
        "hp": "20",
        "atk": "1",
        "def": "0"
      },
      "second":{
        "id": message.mentions.users.first().id,
        "hp": "20",
        "atk": "1",
        "def": "0"
      }
    }
      message.channel.send(`Вы начали сражение с ${message.mentions.users.first().username}!\nПервый ходит ${message.mentions.users.first().username}`);  
    }
        
    else if (args[0] === 'battles') {
      message.channel.send(JSON.stringify(battles));
    } else if (args[0] === 'attack') {
      for (i in battles.length) {
        if (battles[i].first.id === message.author.id) {
          let rewrite = battles[i].first;
          battles[i].first = battles[i].second;
          battles[i].second = rewrite;
          message.channel.send(`${message.author.name} промохнулся`);
          break;
        }
      }
    }
  } else if (command === 'start') {
    play(queue, message);
  } else if (command === 'add') {
    try {
      queue[queue.length] = [args[0]];
      message.channel.send('Добавленно в очередь :musical_note:');
    } catch {
      message.channel.send('Ошибка :no_entry_sign:');
    }
  } else if (command === 'skip') {
    try {
      queue.shift();
      const connection = await message.member.voice.channel.join();
      message.channel.send('Пропустил :musical_note:');
      play(queue, message);
    } catch {
      message.channel.send('Ошибка :no_entry_sign:');
    }
  } else if (command === 'leave') {
    try {
      queue = [];
      const connection = await message.member.voice.channel.join();
      connection.disconnect();
      message.channel.send('Успешно вышел из канала! :door:');
    } catch {
      message.channel.send('Невозможно выйти :no_entry_sign:');
    }
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

client.on('guildMemberRemove', async member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === welcomeChannel);
  if (!channel) return;

  const canvas = Canvas.createCanvas(700, 250);
  const ctx = canvas.getContext('2d');

  const background = await Canvas.loadImage(backgroundWelcomeImageName);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.font = '35px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Пока,', canvas.width / 2.5, canvas.height / 3.5);

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
  client.user.setActivity(`${prefix}help - help`);
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