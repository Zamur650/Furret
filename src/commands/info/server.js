const Discord = require("discord.js");

module.exports = {
	name: "server",
	category: "info",
	description: "Info about server",

	run: async (client, message) => {
		let embed = new Discord.MessageEmbed()
			.setColor(process.env.BOT_COLOR)
			.setTitle(message.guild.name)
			.setThumbnail(
				`https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`
			)
			.setDescription(message.guild)
			.addFields(
				{ name: "Owner", value: message.guild.owner },
				{ name: "Number of participants", value: message.guild.memberCount },
				{ name: "Number of emoticons", value: message.guild.emojis.cache.size },
				{ name: "Number of roles", value: message.guild.roles.cache.size },
				{ name: "ID", value: message.guild.id }
			);
		message.channel.send(embed);
	}
};
