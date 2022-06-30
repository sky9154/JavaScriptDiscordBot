const { MessageEmbed } = require('discord.js');
const randomCat = require('random-cat-img');

module.exports = {
    async execute (interaction) {
        const res = await randomCat();
        const image = new MessageEmbed().setImage(res.data.message);

        await interaction.update({ embeds: [image], components: [] });
    }
};