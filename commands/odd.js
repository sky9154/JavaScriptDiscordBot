const { SlashCommandBuilder } = require('@discordjs/builders');
const isOdd = require('is-odd');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('odd')
        .setDescription('判斷奇偶數')
        .addIntegerOption((option) => option.setName('number').setDescription('需判斷的數')),
    async execute(interaction) {
        const number = interaction.options.getInteger('number');
        return interaction.reply(isOdd(number) ? `\`${number}\` 是奇數呦~` : `\`${number}\` 是偶數呦~`);
    }
};