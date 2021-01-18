const Discord = require('discord.js');
const nekoLifeClient = require('nekos.life');
const ytdl = require('ytdl-core');
const Canvas = require('canvas');
const Pokedex = require('pokedex');
const fs = require("fs");

const { createCanvas } = require('canvas');
const { token, prefix, welcomeChannel, backgroundWelcomeImageName, muteRoleName } = require('./config.json');

const client = new Discord.Client();
const canvas = createCanvas(500, 500);
const ctx = canvas.getContext('2d');
pokedex = new Pokedex();
let play = false;
const neko = new nekoLifeClient();
let queue = [];

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
    message.channel.send(`:page_with_curl: Помощь: \`\`\`${prefix}help -  Выводит это сообщение\n${prefix}server - Информация о сервере\n${prefix}me - Узнать информацию о себе\n${prefix}password - Генерация паролей\n${prefix}music (ссылка) - воспроизведение музыки с YouTube\n${prefix}leave - выйти из канала\n${prefix}color (цвет) - вывести цвет в формате hex (#ffffff) или rgb (rgb(0,0,0)) без пробелов или random (случайный цвет в формате hex (#ffffff)\n${prefix}pokedex или ${prefix}pokemon + (имя) или (id) покемона - узнать информацию о покемоне\n${prefix}invite - пригласить бота на сервер\n${prefix}coin - подбросить монету\n${prefix}clear (число до 100) - очистка сообщений\n${prefix}neko - кошкодевочка\`\`\``);
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
    let pokemonName;
    let pokemonImage;
    try {
      try {
        pokemonName = pokedex.pokemon(Number(args[0])).name;
      } catch {
        pokemonName = pokedex.pokemon(args[0].toLowerCase()).name;
      }
      if (pokedex.pokemon(pokemonName).sprites.animated === undefined) {
        pokemonImage = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokedex.pokemon(pokemonName).id}.png`
      } else {
        pokemonImage = pokedex.pokemon(pokemonName).sprites.animated;
      }
      const Embed = new Discord.MessageEmbed()
        .setColor('#ffcc99')
        .setTitle(`Имя: ${pokemonName}`)
        .setDescription('Покемон')
        .setThumbnail(pokemonImage)
        .addFields(
          { name: 'Номер', value: pokedex.pokemon(pokemonName).id },
          { name: 'Рост', value: pokedex.pokemon(pokemonName).height },
          { name: 'Вес', value: pokedex.pokemon(pokemonName).weight }
        )
        .setTimestamp()
        .setFooter(client.user.tag, client.user.displayAvatarURL({ dynamic: true }));

      message.channel.send(Embed);
    } catch {
      message.channel.send('Ошибка :no_entry_sign:');
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
  } else if (command === 'music') {
    try {
      if (play == false) {
        if (args[0] !== undefined) {
          if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            const dispatcher = await connection.play(ytdl(args[0], { type: 'opus' }));

            dispatcher.on('start', () => {
              play = true;
              message.channel.send(`Начинаю воспроизведение :musical_note:`);
            });

            dispatcher.on('finish', () => {
              if (play) {
                play = false;
                message.channel.send(`Воспроизведение завершено :musical_note:`);
                connection.disconnect();
              }
            });
            
            dispatcher.on('error', console.error);
          } else {
            message.channel.send('Вы не в канале :no_entry_sign:');
          }
        } else {
          message.channel.send('Вы не указали что мне играть :no_entry_sign:');
        }
      } else {
        message.channel.send('Сейчас играет музыка :no_entry_sign:');
      }
    } catch {
      play = false;
      message.channel.send('Ошибка :no_entry_sign:');
      return;
    }
  } else if (command === 'queue') {
    try {
      queue[queue.length] = [args[0]];
      const connection = await message.member.voice.channel.join();
      connection.disconnect();
      message.channel.send('Успешно вышел из канала! :door:');
    } catch {
      message.channel.send('Невозможно выйти :no_entry_sign:');
    }
  } else if (command === 'leave') {
    try {      
      play = false;
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