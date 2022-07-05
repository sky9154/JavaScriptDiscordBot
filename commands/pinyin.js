const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { pinyin } = require('pinyin-pro');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pinyin')
        .setDescription('漢語轉拼音轉換器')
        .addStringOption((option) => option.setName('text').setDescription('漢語').setRequired(true)),
    async execute (interaction) {
        const original = interaction.options.getString('text');

        const pinyinEmbed = new MessageEmbed()
            .setTitle('漢語轉拼音轉換器')
            .setDescription(`漢語：${original}\n拼音：${pinyin(original, { toneType: 'num', removeNonZh: true })}`)
            .setColor('#5e9bbc')
            .setFooter({ text: 'Copyright © 2022 oF' });

        await interaction.reply({ embeds: [pinyinEmbed] });
    }
};