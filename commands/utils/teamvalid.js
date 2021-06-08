const Sim = require('pokemon-showdown');
const { Koffing } = require('koffing');

module.exports = {
  name: 'teamvalid',
  aliases: ['format', 'team'],
  category: 'utils',
  description : 'Проверка команды в Pokemon showdown',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async(client, message, args) => {
    const validator = new Sim.TeamValidator(args[0]);
    const teamCode = args.slice(1, args.length).join(' ');

    let parsedTeam = Koffing.parse(teamCode);

    jsonTeam = JSON.parse(parsedTeam.toJson()).teams[0].pokemon;

    for (let i = 0; i < jsonTeam.length; i++) {
      jsonTeam[i].species = jsonTeam[i].name
    }

    console.log(jsonTeam)

    let output = validator.validateTeam(jsonTeam);
    message.channel.send(output);
  }
}