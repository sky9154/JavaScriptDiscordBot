const { SlashCommandBuilder } = require('@discordjs/builders');
const randomCat = require('random-cat-img');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random-image')
        .setDescription('隨機圖片')
        .addStringOption((option) => option.setName('image').setDescription('隨機圖片').setRequired(true)
            .addChoices(
                { name: '貓咪', value: 'cat' },
                { name: '支語警官', value: 'police' })
            ),
    async execute (interaction) {
        const option = interaction.options.getString('image');
        let image;

        if (option === 'cat') {
            const res = await randomCat();
            image = res.data.message;
        } else if (option === 'police') {
            image = `https://ect.incognitas.net/szh_police/_${Math.random() * 8763}.jpg`;
        }

        await interaction.reply({ files: [image] });
    }
};