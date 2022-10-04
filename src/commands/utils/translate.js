const translate = require("@iamtraction/google-translate");
const Discord = require("discord.js");

module.exports = {
	name: "translate",
	aliases: ["target language", "text"],
	category: "utils",
	description: "Translate to selected language",

	run: async (client, message, args) => {
		if (!args || args.length < 2)
			return message.channel.send(
				"You did not supply enough arguments :no_entry_sign:"
			);

		let requestLanguage = args.shift().toLowerCase();

		// Translate
		let response = await translate(args.join(" "), { to: requestLanguage });

		// Send result
		const Embed = new Discord.MessageEmbed()
			.setColor(process.env.BOT_COLOR)
			.setTitle(`Text in ${requestLanguage}`)
			.setDescription(response.text)
			.addField("Original language", response.from.language.iso)
			.setFooter(
				`${message.author.username}#${message.author.discriminator}`,
				client.users.cache
					.find((user) => user.id === process.env.DEVELOPER_ID)
					.displayAvatarURL({ dynamic: true })
			)
			.setTimestamp();

		message.channel.send(Embed);
	}
};
