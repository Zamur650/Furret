module.exports = {
	name: "password",
	category: "utils",
	description: "Generating passwords",

	run: async (client, message) => {
		let charset =
			"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		let password = "";
		for (let i = 0, n = charset.length; i < 8; ++i) {
			password += charset.charAt(Math.floor(Math.random() * n));
		}
		message.channel.send(`Password: ||${password}|| :keyboard:`);
	}
};
