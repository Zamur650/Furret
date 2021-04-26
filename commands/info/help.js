const Discord = require('discord.js');
const fs = require('fs');

const { prefix, developerID, botColor } = require('../../config.json');

module.exports = {
  name: 'help',
  aliases: ['command'],
  category: 'info',
  description: 'Выводит это сообщение',
  run: async (client, message, args) => {
    if (!args[0]) {
      let categories = [];

      fs.readdirSync('./commands/').forEach((dir) => {
        const commands = fs.readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith('.js')
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return 'Команда не найдена';

          let name = file.name.replace('.js', '');

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? 'В прогрессе.' : cmds.join(' '),
        };

        categories.push(data);
      });

      const embed = new Discord.MessageEmbed()
        .setTitle('📬 Нужна помощь? Прочитайте про все команды:')
        .addFields(categories)
        .setDescription(
          `Используйте \`${prefix}help\` чтобы получить помощь. Например: \`${prefix}help me\`.`
        )
        .setFooter(`От ${client.users.cache.find(user => user.id === developerID).username + client.users.cache.find(user => user.id === developerID).discriminator}`, client.users.cache.find(user => user.id === developerID).displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(botColor);
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new Discord.MessageEmbed()
          .setTitle(`Такой команды не существует! Используйте \`${prefix}help\` чтобы посмотреть список команд!`)
          .setColor(botColor).setFooter(`От ${client.users.cache.find(user => user.id === developerID).username + client.users.cache.find(user => user.id === developerID).discriminator}`, client.users.cache.find(user => user.id === developerID).displayAvatarURL({ dynamic: true }));
        return message.channel.send(embed);
      }

      const embed = new Discord.MessageEmbed()
        .setTitle('Детали команды:')
        .addField('Префикс:', `\`${prefix}\``)
        .addField(
          'Комманда:',
          command.name ? `\`${command.name}\`` : 'Нет имени для команды!'
        )
        .addField(
          'Алиассы:',
          command.aliases
            ? `\`${command.aliases.join('` `')}\``
            : 'Для данной команды нет алиассов!'
        )
        .addField(
          'Использование:',
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          'Описание:',
          command.description
            ? command.description
            : 'Для данной команды нет описания!'
        )
        .setFooter(`От ${client.users.cache.find(user => user.id === developerID).username + client.users.cache.find(user => user.id === developerID).discriminator}`, client.users.cache.find(user => user.id === developerID).displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(botColor);
      return message.channel.send(embed);
    }
  },
};
