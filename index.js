const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const fs = require('fs');
const { token, prefix, twitchLink } = require('./config.json');

const client = new Discord.Client({
  disableEveryone: true
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync('./commands/');

global.queue = [];
global.connection;
global.dispatcher;

global.play = async (queue, message) => {
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
}

['command'].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on('ready', () => {
  console.log(`Захожу как: ${client.user.tag}!`);
  client.user.setActivity(`${prefix}help`, {
    type: 'STREAMING',
    url: twitchLink
  });
});

client.on('message', async message => {
  try {
    console.log(`${now}, ${message.guild.name}, ${message.author.username}: ${message.content}`);
  } catch {
    console.log(`${message.author.username}: ${message.content}`);
  }

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  if (!message.guild) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command) command.run(client, message, args).catch(function (e) {
    message.channel.send('Ошибка :no_entry_sign:' + e);
    throw e;
  });
});

client.on('reconnecting', () => {
  console.log(`Перезашёл как: ${client.user.tag}!`);
  client.user.setActivity(`${prefix}help`, {
    type: 'STREAMING',
    url: twitchLink
  });
});

client.once('disconnect', () => {
  console.log(`Отключился как ${client.user.tag}!`);
});

client.login(token);
