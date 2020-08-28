const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const Canvas = require('canvas');
const { createCanvas } = require('canvas');
const { token, prefix, news, welcomeChannel, backgroundWelcomeImageName } = require('./config.json');

const canvas = createCanvas(500, 500);
const ctx = canvas.getContext('2d');
let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
let hexCharset = 'ABCDEF0123456789';

client.once('ready', () => {
  console.log(`Захожу как ${client.user.tag}!`);
});
client.once('reconnecting', () => {
  console.log(`Перезахожу как ${client.user.tag}!`);
});
client.once('disconnect', () => {
  console.log(`Выхожу как ${client.user.tag}!`);
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'help') {
    message.channel.send(`\`\`\`${prefix}help - Выводит это сообщение\n${prefix}hi - Поздороваться\n${prefix}server - Информация о сервере\n${prefix}me - Узнать информацию о себе\n${prefix}news - Новости\n${prefix}password - Генерация паролей\n${prefix}music (ссылка) - воспроизведение музыки с YouTube (в разработке)\n${prefix}color (цвет) - вывести цвет в формате hex (#ffffff) или rgb (rgb(0,0,0)) без пробелов или random (случайный цвет в формате hex (#ffffff))\`\`\``)
  } else if (command === 'hi') {
    message.channel.send('Привет');
  } else if (command === 'server') {
    try {
      message.channel.send(`Название сервера: ${message.guild.name}\nКоличество участников: ${message.guild.memberCount}`);
    }
    catch {
      message.channel.send('Это не сервер :(');
    }
  } else if (command === 'me') {
    try {
      let channelEmbed = message.member.voice.channel;
      if (channelEmbed === null) {
        channelEmbed = 'Не в канале';
      }
      const Embed = new Discord.MessageEmbed()
        .setColor('#92ff8c')
        .setTitle(`Имя: ${message.author.username}`)
        .setURL()
        .setDescription(`Участник сервера: ${message.guild.name}`)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .addFields(
          { name: 'Канал', value: channelEmbed },
          { name: 'Id', value: message.author.id }
        )
        .setTimestamp()
        .setFooter(client.user.tag, client.user.displayAvatarURL({ dynamic: true }));

      message.channel.send(Embed);
    }
    catch {
      message.channel.send('Это не сервер :(');
    }
  } else if (command === 'news') {
    message.channel.send(`Новости: ${news}`);
  } else if (command === 'password') {
    let password = "";
    for (let i = 0, n = charset.length; i < 8; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    message.channel.send(`Пароль: ${password}`);
  } else if (command === 'online') {
    message.channel.send();
  } else if (command === 'color') {    
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
  } else if (command === 'join') {
    client.emit('guildMemberAdd', message.member);    
  } 
});

client.on('message', async message => {  
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === 'music') {
    try {
      if (args[0] != undefined) {
        if (message.member.voice.channel) {
          const connection = await message.member.voice.channel.join();
          const dispatcher = await connection.play(ytdl(args[0], { type: 'opus' }));

          dispatcher.on('start', () => {
            message.channel.send(`Начинаю воспроизведение :musical_note:`)
          });

          dispatcher.on('finish', () => {
            message.channel.send(`Воспроизведение завершено :musical_note:`)
          });

          dispatcher.on('error', console.error);
        } else {
          message.channel.send('Вы не в канале :no_entry_sign:')
        }
      } else {
        message.channel.send('Вы не указали что мне играть :no_entry_sign:')
      }
    } catch {
      return;
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

client.login(token);