const { MessageEmbed } = require('discord.js');

module.exports = {
    async execute (interaction) {
        const image = new MessageEmbed().setImage(`https://ect.incognitas.net/szh_police/_${Math.random() * 8763}.jpg`);

        await interaction.update({ embeds: [image], components: [] });
    }
};