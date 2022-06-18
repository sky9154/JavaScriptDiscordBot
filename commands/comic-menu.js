const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('comic')
        .setDescription('漫畫搜尋器'),
    async execute(interaction) {
        const user = [
            '480780313778323456',
            '471614640594354188'
        ];
        if (user.includes(interaction.user.id)) {
            const menu = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('comicMenu')
                        .setPlaceholder('選擇模式')
                        .addOptions([
                            {
                                label: 'popular',
                                description: '顯示當前熱度最高的漫畫',
                                value: 'popular',
                                emoji: '<a:blobreach:984878619497230346>'
                            }, {
                                label: 'random',
                                description: '隨機推薦漫畫',
                                value: 'random',
                                emoji: '<a:blobreach:984878612954107944>'
                            }, {
                                label: 'id',
                                description: '根據編號查詢漫畫',
                                value: 'id',
                                emoji: '<a:blobreach:984878611293171713>'
                            }, {
                                label: 'keyword',
                                description: '根據關鍵字查詢漫畫',
                                value: 'keyword',
                                emoji: '<a:blobreach:984878618025021450>'
                            }, {
                                label: 'author',
                                description: '根據作者查詢漫畫',
                                value: 'author',
                                emoji: '<a:blobreach:984878614669566022>'
                            }
                        ]
                    )
                );

            await interaction.reply({ components: [menu] });
        } else {
            await interaction.reply('你沒有權限使用這個指令!');
        }
    }
};