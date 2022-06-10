const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('獲取成員頭貼')
		.addUserOption((option) => option.setName('target').setDescription('要獲取的成員')),
	async execute(interaction) {
		const user = interaction.options.getUser('target');

		if (user) {
			return interaction.reply(`${user.username} 的頭貼：${user.displayAvatarURL({ dynamic: true }) }`);
		} else {
			return interaction.reply(`你的頭貼：${interaction.user.displayAvatarURL({ dynamic: true }) }`);
		}
	}
};