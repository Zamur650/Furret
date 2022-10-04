const { convert } = require("html-to-text");

module.exports = {
	name: "html",
	category: "utils",
	description: "Converter that parses HTML and returns text",

	run: async (client, message, args) => {
		const text = convert(args.join(" "), {
			wordwrap: 130
		});

		message.channel.send(text);
	}
};
