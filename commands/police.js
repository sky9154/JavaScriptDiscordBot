const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('police')
        .setDescription('支語警察'),
    async execute(interaction) {
        await interaction.reply(`https://ect.incognitas.net/szh_police/_${Math.random() * 8763}.jpg`);
    }
};