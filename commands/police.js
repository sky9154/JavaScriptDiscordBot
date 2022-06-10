const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('police')
        .setDescription('支語警察'),
    async execute(interaction) {
        const randomNumber = Math.random() * 8763;

        return interaction.reply(`https://ect.incognitas.net/szh_police/_${randomNumber}.jpg`);
    }
};