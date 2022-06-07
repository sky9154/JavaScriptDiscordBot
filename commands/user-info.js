const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user-info')
		.setDescription('查看個人訊息'),
	async execute(interaction) {
		return interaction.reply(`你的名字：${interaction.user.username}\n你的 ID：${interaction.user.id}`);
	}
};