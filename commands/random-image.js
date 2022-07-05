const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random-image')
        .setDescription('隨機圖片'),
    async execute (interaction) {
        const imageButton = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('cat')
                    .setStyle('SUCCESS')
                    .setLabel('𝗖𝗔𝗧')
                    .setEmoji('<a:blobreach:991844747213803560>'),

                new MessageButton()
                    .setCustomId('police')
                    .setStyle('DANGER')
                    .setLabel('𝗣𝗢𝗟𝗜𝗖𝗘')
                    .setEmoji('<a:blobreach:984878614669566022>'),
            );

        await interaction.reply({ components: [imageButton] });
    }
};