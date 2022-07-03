const { Modal, MessageEmbed, MessageActionRow, TextInputComponent } = require('discord.js');
const nHentai = require('shentai');
const sHentai = new nHentai;

module.exports = {
    async execute(interaction) {
        /**
         * 設定 Embed 群組
         * @param comic 漫畫資料
         * @returns {MessageEmbed} MessageEmbed
         */
        const setMoreComicEmbed = (comic) => comic.map((item) => new MessageEmbed()
            .setTitle(item.titles.english)
            .setURL(`https://nhentai.net/g/${item.id}/`)
            .setDescription(`#${item.id}`)
            .setColor('#f23857')
            .setThumbnail(item.cover)
            .setFooter({text: 'Copyright © 2022 oF'}));

        /**
         * 設定 Embed
         * @param comic 漫畫資料
         * @returns {MessageEmbed} MessageEmbed
         */
        const setComicEmbed = (comic) => new MessageEmbed()
            .setTitle(comic.titles.english)
            .setURL(`https://nhentai.net/g/${comic.id}/`)
            .setDescription(comic.titles.original)
            .setColor('#f23857')
            .addField('編號', `\`${comic.id}\``, true)
            .addField('頁數', `\`${comic.pages.length}\``, true)
            .setImage(comic.cover)
            .setFooter({ text: 'Copyright © 2022 oF' });

        const menuValue = interaction.values[0];
        let comic;

        switch (menuValue) {
            case 'popular':
                comic = await sHentai.getPopular();
                await interaction.update({ embeds: setMoreComicEmbed(comic), components: [] });
                break;
            case 'random':
                comic = await sHentai.getRandom();
                await interaction.update({ embeds: [setComicEmbed(comic)], components: [] });
                break;
            case 'id':
            case 'keyword':
            case 'author':
                let customId, info, valueActionRow;
                let components = new TextInputComponent()
                    .setCustomId('value')
                    .setLabel("請輸入查詢條件")
                    .setStyle('SHORT')
                    .setRequired(true);

                if (menuValue === 'id') {
                    customId = 'comicIdModel';
                    info = '編號查詢';
                    components = new TextInputComponent()
                        .setCustomId('value')
                        .setLabel("請輸入查詢條件")
                        .setStyle('SHORT')
                        .setMaxLength(6)
                        .setRequired(true);
                } else if (menuValue === 'keyword') {
                    customId = 'comicKeywordModel';
                    info = '關鍵字查詢';
                } else if (menuValue === 'author') {
                    customId = 'comicAuthorModel';
                    info = '作者查詢';
                }

                valueActionRow = new MessageActionRow().addComponents(components);

                const modal = new Modal()
                    .setCustomId(customId)
                    .setTitle(info);

                modal.addComponents(valueActionRow);

                await interaction.showModal(modal);
                break;
            default:
                await interaction.update({ content: '當前模式尚未完成!', embeds: [], components: [] });
                break;
        }
    }
};