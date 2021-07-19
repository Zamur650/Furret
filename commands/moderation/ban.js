const Discord = require('discord.js')
const fetch = require('node-fetch')
const FormData = require('form-data')

module.exports = {
  name: 'ban',
  aliases: ['ping'],
  category: 'moderation',
  description: 'Заблокировать человека',

  run: async (client, message, args) => {
    let member = message.mentions.users.first()
    if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.permissions.has('BAN_MEMBERS')) return
    if (!member) return message.channel.send('Пользователь не найден :no_entry_sign:')
    if (message.member.roler.highest.position <= member.roler.highest.postion) return message.reply('Вы не можете заблокировать человека т.к у него выше роль :no_entry_sign:')
    let target = message.guild.members.cache.get(member.id)
    target.ban()
    message.channel.send(`${member.username}#${member.discriminator} был(-а) заблокирован(-а) :door: `)
  }
}