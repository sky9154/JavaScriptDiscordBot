const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('查看伺服器訊息'),
	async execute(interaction) {
		return interaction.reply(`伺服器名稱：${interaction.guild.name}\n伺服器人數：${interaction.guild.memberCount} 人`);
	}
};