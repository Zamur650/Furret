const { convert } = require('html-to-text');

module.exports = {
  name: 'html',
  category: 'utils',
  description : 'Продвинутый конвертер, который разбирает HTML и возвращает красивый текст.',

  run: async(client, message, args) => {
    const text = convert(args.join(' '), {
      wordwrap: 130
    })

    message.channel.send(text)
  }
}