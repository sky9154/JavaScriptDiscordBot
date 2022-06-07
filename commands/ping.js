const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('回傳 Pong!'),
	async execute(interaction) {
		return interaction.reply('Pong!');
	}
};
