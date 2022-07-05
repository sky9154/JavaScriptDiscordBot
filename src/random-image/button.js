const randomCat = require('random-cat-img');

module.exports = {
    async execute (interaction) {
        let image;

        if (interaction.customId === 'cat') {
            const res = await randomCat();
            image = res.data.message
        } else if (interaction.customId === 'police') {
            image = `https://ect.incognitas.net/szh_police/_${Math.random() * 8763}.jpg`
        }

        await interaction.update({ content: image, components: [] });
    }
};