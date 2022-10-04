module.exports = {
	name: "ban",
	aliases: ["ping"],
	category: "moderation",
	description: "Ban the user",

	run: async (client, message) => {
		let member = message.mentions.users.first();
		if (
			!message.member.permissions.has("ADMINISTRATOR") &&
			!message.member.permissions.has("BAN_MEMBERS")
		)
			return;
		if (!member)
			return message.channel.send("User is not found :no_entry_sign:");

		let target = message.guild.members.cache.get(member.id);

		target
			.ban()
			.then(() => {
				message.channel.send(`<@!${member.id}> was banned :door:`);
			})
			.catch(() => {
				message.channel.send(
					`<@!${member.id}> was **NOT** banned :no_entry_sign: `
				);
			});
	}
};
