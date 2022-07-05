const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('刪除訊息')
		.addIntegerOption((option) => option.setName('amount').setDescription('刪除訊息筆數').setRequired(true)),
	async execute (interaction) {
		const amount = interaction.options.getInteger('amount');

		await interaction.channel.bulkDelete(amount, true).catch((error) => {
			console.error(error);
			interaction.reply({ content: '刪除訊息時發生錯誤!', ephemeral: true });
		});

		await interaction.reply({ content: `已刪除 \`${amount}\` 筆訊息`, ephemeral: true });
	}
};