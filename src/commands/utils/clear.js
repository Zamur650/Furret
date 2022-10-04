module.exports = {
	name: "clear",
	aliases: ["amount"],
	category: "utils",
	description: "Clearing messages",

	run: async (client, message, args) => {
		let amount = args[0];

		if (!amount) amount = 100;
		if (isNaN(amount))
			return message.channel.send("This is not a number! :no_entry_sign:");
		if (amount > 100)
			return message.channel.send(
				"You cannot delete more than 100 posts at a time! :no_entry_sign:"
			);
		if (amount < 1)
			return message.channel.send(
				"You must enter a number greater than 1! :no_entry_sign:"
			);

		let handle = true;

		handle = await message.channel.bulkDelete(amount).catch(() => {
			return false;
		});

		if (handle == false)
			return message.channel.send(
				"You cannot retrieve messages older than 14 days :no_entry_sign:"
			);
		return message.channel.send(`Removed ${amount} messages :wastebasket:`);
	}
};
