const Discord = require("discord.js");

module.exports = {
  name: "user",
  aliases: ["ping"],
  category: "info",
  description: "Find out information about selected user",

  run: async (client, message, args) => {
    let mentioned = message.mentions.users.first();

    let user;

    if (mentioned) user = mentioned;
    if (!mentioned) user = message.author;

    let channelEmbed = message.guild.members.cache.get(user.id).voice.channel;
    let status = user.presence.status;

    switch (status) {
      case "online":
        status = ":green_circle: Online";
        break;
      case "idle":
        status = ":crescent_moon: Not active";
        break;
      case "dnd":
        status = ":red_circle: Do not disturb";
        break;
      case "offline":
        status = ":black_circle: Offline";
        break;
    }

    if (channelEmbed == null) channelEmbed = "Not in the channel";

    const Embed = new Discord.MessageEmbed()
      .setColor(process.env.BOT_COLOR)
      .setTitle(`${user.username}#${user.discriminator}`)
      .setDescription(`Server member: ${message.guild.name}`)
      .setThumbnail(
        `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
      )
      .addFields(
        { name: "Channel", value: channelEmbed },
        { name: "Status", value: status },
        { name: "Id", value: user.id }
      )
      .setTimestamp();

    message.channel.send(Embed);
  },
};
