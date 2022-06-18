const { MessageEmbed } = require('discord.js');
const nHentai = require('shentai');
const sHentai = new nHentai;

module.exports = {
    async execute(interaction) {
        /**
         * 設定 Embed 群組
         * @param comic 漫畫資料
         * @returns {*[]} MessageEmbed
         */
        const setMoreComicEmbed = (comic) => {
            let comicArr = [];
            for (let i = 0; i < 10; ++ i) {
                comicArr.push(
                    new MessageEmbed()
                        .setTitle(comic[i].titles.english)
                        .setURL(`https://nhentai.net/g/${comic[i].id}/`)
                        .setDescription(`#${comic[i].id}`)
                        .setColor('#f23857')
                        .setThumbnail(comic[i].cover)
                        .setFooter({text: 'Copyright © 2022 oF'})
                );
            }
            return comicArr;
        }

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

        /**
         * 設定錯誤 Embed
         * @param value 錯誤訊息
         * @returns {MessageEmbed} MessageEmbed
         */
        const errrorEmbed = (value) => new MessageEmbed()
            .setTitle('錯誤!')
            .setDescription(value)
            .setColor('#f23857')
            .setFooter({ text: 'Copyright © 2022 oF' });

        const customId = interaction.customId;
        const value = interaction.fields.getTextInputValue('value');
        let comic;

        switch (customId) {
        case 'comicIdModel':
            const id = value.replace(/-/g, '');

            if (/^-?\d+$/.test(id)) {
                comic = await sHentai.getDoujin(id);

                if (Object.keys(comic).includes('message')) {
                    await interaction.update({ embeds: [errrorEmbed('看起來你要找的東西不在這裡!')], components: [] });
                } else {
                    await interaction.update({ embeds: [setComicEmbed(comic)], components: [] });
                }
            } else {
                await interaction.update({ embeds: [errrorEmbed('請輸入純數字!')], components: [] });
            }
            break;
        case 'comicKeywordModel':
            comic = await sHentai.search(value);

            if (Object.keys(comic).includes('message')) {
                await interaction.update({ embeds: [errrorEmbed('看起來你要找的東西不在這裡!')], components: [] });
            } else {
                await interaction.update({ embeds: setMoreComicEmbed(comic.results), components: [] });
            }
            break;
        case 'comicAuthorModel':
            comic = await sHentai.byAuthor(value);

            if (Object.keys(comic).includes('message')) {
                await interaction.update({ embeds: [errrorEmbed('看起來你要找的東西不在這裡!')], components: [] });
            } else {
                await interaction.update({ embeds: setMoreComicEmbed(comic.results), components: [] });
            }
            break;
        }
    }
};