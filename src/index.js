const Discord = require("discord.js");
const fs = require("fs");

require("./functions/music.js");

require("dotenv").config();

const client = new Discord.Client();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("./src/commands/");

require(`./handlers/command`)(client);

client.on("ready", () => {
  console.log(`Logged in ${client.user.tag}!`);
  client.user.setActivity(`${process.env.PREFIX}help - help`);
});

client.on("message", async (message) => {
  try {
    console.log(
      `${message.guild.name}, ${message.author.username}: ${message.content}`
    );
  } catch {
    console.log(`${message.author.username}: ${message.content}`);
  }

  if (message.author.bot) return;
  if (!message.content.startsWith(process.env.PREFIX)) return;
  if (!message.guild) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  const args = message.content
    .slice(process.env.PREFIX.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command)
    command.run(client, message, args).catch((error) => {
      message.channel.send("Ошибка :no_entry_sign:");
      console.error(error);
    });
});

client.on("reconnecting", () => {
  console.log(`Logged in ${client.user.tag}!`);
  client.user.setActivity(`${process.env.PREFIX}help - help`);
});

client.once("disconnect", () => {
  console.log(`Disconnected from ${client.user.tag}!`);
});

client.login(process.env.TOKEN);
