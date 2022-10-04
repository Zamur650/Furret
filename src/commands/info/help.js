const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "help",
	aliases: ["command"],
	category: "info",
	description: "Sends this message",
	run: async (client, message, args) => {
		if (!args[0]) {
			let categories = [];

			fs.readdirSync("./src/commands/").forEach((dir) => {
				const commands = fs
					.readdirSync(`./src/commands/${dir}/`)
					.filter((file) => file.endsWith(".js"));

				const cmds = commands.map((command) => {
					let file = require(`../../commands/${dir}/${command}`);

					if (!file.name) return "Command not found";

					let name = file.name.replace(".js", "");

					return `\`${name}\``;
				});

				let data = new Object();

				data = {
					name: dir.toUpperCase(),
					value: cmds.length === 0 ? "In progress." : cmds.join(" ")
				};

				categories.push(data);
			});

			const embed = new Discord.MessageEmbed()
				.setTitle("Help 📬")
				.addFields(categories)
				.setDescription(
					`Use \`${process.env.PREFIX}help\` to get help. For example: \`${process.env.PREFIX}help me\`.`
				)
				.setFooter(
					`От ${
						client.users.cache.find(
							(user) => user.id === process.env.DEVELOPER_ID
						).username
					}#${
						client.users.cache.find(
							(user) => user.id === process.env.DEVELOPER_ID
						).discriminator
					}`,
					client.users.cache
						.find((user) => user.id === process.env.DEVELOPER_ID)
						.displayAvatarURL({ dynamic: true })
				)
				.setTimestamp()
				.setColor(process.env.BOT_COLOR);
			return message.channel.send(embed);
		} else {
			const command =
				client.commands.get(args[0].toLowerCase()) ||
				client.commands.find(
					(c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
				);

			if (!command) {
				const embed = new Discord.MessageEmbed()
					.setTitle(
						`There is no such command! Use \`${process.env.PREFIX}help\` to see the list of commands.`
					)
					.setColor(process.env.BOT_COLOR)
					.setFooter(
						`От ${
							client.users.cache.find(
								(user) => user.id === process.env.DEVELOPER_ID
							).username +
							client.users.cache.find(
								(user) => user.id === process.env.DEVELOPER_ID
							).discriminator
						}`,
						client.users.cache
							.find((user) => user.id === process.env.DEVELOPER_ID)
							.displayAvatarURL({ dynamic: true })
					);
				return message.channel.send(embed);
			}

			const embed = new Discord.MessageEmbed()
				.setTitle(`Details of ${process.env.PREFIX}${command.name}`)
				.setDescription(
					command.description
						? command.description
						: "There is no description for this command!"
				)
				.addField(
					"Arguments",
					command.aliases
						? `\`${command.aliases.join("` `")}\``
						: "There are no arguments for this command!"
				)
				.setFooter(
					`Made by ${
						client.users.cache.find(
							(user) => user.id === process.env.DEVELOPER_ID
						).username +
						client.users.cache.find(
							(user) => user.id === process.env.DEVELOPER_ID
						).discriminator
					}`,
					client.users.cache
						.find((user) => user.id === process.env.DEVELOPER_ID)
						.displayAvatarURL({ dynamic: true })
				)
				.setTimestamp()
				.setColor(process.env.BOT_COLOR);
			return message.channel.send(embed);
		}
	}
};
