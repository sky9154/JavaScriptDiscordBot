const { SlashCommandBuilder } = require('@discordjs/builders');
const randomCat = require('random-cat-img');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('隨機貓咪圖'),
    async execute(interaction) {
        randomCat().then(res => interaction.reply(res.data.message));
    }
};