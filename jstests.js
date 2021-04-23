https.get('https://play.pokemonshowdown.com/data/moves.js?2e0bee6d/', (json) => {
  let body = '';

  json.on('data', (chunk) => {
    body += chunk;
  });

  json.on('end', () => {
    try {
      eval(body);

      response = exports.BattlePokedex[args.join('').split('-').join('').toLowerCase()];

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

            response = exports.BattlePokedex[args.join('').split('-').join('').toLowerCase()];

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

                  response = exports.BattlePokedex[args.join('').split('-').join('').toLowerCase()];

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

