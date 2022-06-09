const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('change-font')
        .setDescription('英文字體轉換器')
        .addStringOption((option) => option.setName('word').setDescription('英文句子')),
    async execute(interaction) {
        const originalArray = [
            /A/g ,/B/g ,/C/g ,/D/g ,/E/g ,/F/g ,/G/g ,/H/g ,/I/g ,/J/g,
            /K/g ,/L/g ,/M/g ,/N/g ,/O/g ,/P/g ,/Q/g ,/R/g ,/S/g ,/T/g,
            /U/g ,/V/g ,/W/g ,/X/g ,/Y/g ,/Z/g,
            /a/g ,/b/g ,/c/g ,/d/g ,/e/g ,/f/g ,/g/g ,/h/g ,/i/g ,/j/g,
            /k/g ,/l/g ,/m/g ,/n/g ,/o/g ,/p/g ,/q/g ,/r/g ,/s/g ,/t/g,
            /u/g ,/v/g ,/w/g ,/x/g ,/y/g ,/z/g,
            /0/g ,/1/g ,/2/g ,/3/g ,/4/g ,/5/g, /6/g ,/7/g ,/8/g ,/9/g
        ];
        const newArray = [
            '𝗔', '𝗕', '𝗖', '𝗗', '𝗘', '𝗙', '𝗚', '𝗛', '𝗜', '𝗝',
            '𝗞', '𝗟', '𝗠', '𝗡', '𝗢', '𝗣', '𝗤', '𝗥', '𝗦', '𝗧',
            '𝗨', '𝗩', '𝗪', '𝗫', '𝗬', '𝗭',
            '𝗮', '𝗯', '𝗰', '𝗱', '𝗲', '𝗳', '𝗴', '𝗵', '𝗶', '𝗷',
            '𝗸', '𝗹', '𝗺', '𝗻', '𝗼', '𝗽', '𝗾', '𝗿', '𝘀', '𝘁',
            '𝘂', '𝘃', '𝘄', '𝘅', '𝘆', '𝘇',
            '𝟬', '𝟭', '𝟮', '𝟯', '𝟰', '𝟱', '𝟲', '𝟳', '𝟴', '𝟵'
        ];
        const original = interaction.options.getString('word');
        const regex = original.replace(/[^a-zA-Z0-9 ~!@#$%^&*()_+-]/g, '-');
        let result = regex;
        originalArray.forEach((item, index) => result = result.replace(item, newArray[index]));

        const changeFontEmbed = new MessageEmbed()
            .setTitle('英文字體轉換器')
            .setDescription(`原始樣式：${original}\n去除不明文字：${regex}\n轉換結果：${result}`)
            .setColor('0x5e9bbc')
            .setFooter({ text: 'Copyright © 2022 oF' });

        return interaction.reply({ embeds: [changeFontEmbed] });
    }
};