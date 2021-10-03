const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "mineskin",
  aliases: ["name"],
  category: "api",
  description: "Get minecraft skin & uuid",

  run: async (client, message, args) => {
    let response = await (
      await fetch(`https://api.ashcon.app/mojang/v2/user/${args.join(" ")}`)
    ).json();

    let usernames = "";

    response.username_history.forEach((usernameObject) => {
      usernames += usernameObject.username + ", ";
    });

    const Embed = new Discord.MessageEmbed()
      .setColor(process.env.BOT_COLOR)
      .setTitle(response.username)
      .setDescription(`UUID: ${response.uuid}`)
      .setImage(`${response.textures.skin.url}`)
      .addFields({ name: "All names", value: usernames })
      .setTimestamp();

    message.channel.send(Embed);
  },
};
