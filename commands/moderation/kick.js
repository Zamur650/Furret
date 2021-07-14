const Discord = require('discord.js');
const fetch = require('node-fetch');
const FormData = require('form-data');

module.exports = {
  name: 'kick',
  aliases: ['ping'],
  category: 'moderation',
  description: 'Выгнать человека',

  run: async (client, message, args) => {
    let member = message.mentions.users.first()
    if (!member) return message.channel.send('Пользователь не найден :no_entry_sign:')
    if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.permissions.has('KICK_MEMBERS')) return
    if (message.member.roler.highest.position <= member.roler.highest.postion) return message.reply('Вы не можете выгнать человека т.к у него выше роль :no_entry_sign:')
    let target = message.guild.members.cache.get(member.id)
    target.kick()
    message.channel.send(`${member.username}#${member.discriminator} был(-а) удален(-а) :door: `)
  }
}