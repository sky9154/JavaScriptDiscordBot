const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, version } = require('discord.js');
const process = require('node:process');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot-info')
        .setDescription('關於機器人'),
    async execute(interaction) {
        const linkButton = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setURL('https://github.com/sky9154/JavaScriptDiscordBot')
                    .setStyle('LINK')
                    .setLabel('𝗚𝗜𝗧𝗛𝗨𝗕')
                    .setEmoji('<a:blobreach:983792417998266468>'),

                new MessageButton()
                    .setURL('https://discord.com/api/oauth2/authorize?client_id=787345494405546014&permissions=8&scope=bot%20applications.commands')
                    .setStyle('LINK')
                    .setLabel('𝗜𝗡𝗩𝗜𝗧𝗘 𝗠𝗘')
                    .setEmoji('<a:blobreach:984878616338890812>'),
            );

        const aboutEmbed = new MessageEmbed()
            .setAuthor({ name: 'oF', iconURL: 'https://cdn.discordapp.com/attachments/900320455477579836/983774623185387583/image.png', url: 'https://github.com/sky9154' })
            .setTitle('Discord Bot')
            .setThumbnail('https://cdn.discordapp.com/attachments/900320455477579836/983795490443366439/kirito.png')
            .addFields({
                    name: 'Bot Name',
                    value: `\`桐谷和人#6388\``
                }, {
                    name: 'DiscordJs Version',
                    value: `\`v${version}\``,
                    inline: true
                }, {
                    name: 'NodeJs Version',
                    value: `\`${process.version.replace('^', 'v')}\``,
                    inline: true
                }, {
                    name: 'IDE Version',
                    value: `\`WebStorm 2022.1.2\``,
                    inline: true
                }
            )
            .setColor('0xc3e5ed')
            .setFooter({ text: 'Copyright © 2022 oF' });
        await interaction.reply({ embeds: [aboutEmbed], components: [linkButton] });
    }
};