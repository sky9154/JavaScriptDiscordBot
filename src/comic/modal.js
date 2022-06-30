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
        const errorEmbed = (value) => new MessageEmbed()
            .setTitle('錯誤!')
            .setDescription(value)
            .setColor('#f23857')
            .setFooter({ text: 'Copyright © 2022 oF' });

        const customId = interaction.customId;
        const value = interaction.fields.getTextInputValue('value');
        let comic;

        switch (customId) {
        case 'comicIdModel':
            if (/^[0-9]*$/.test(value)) {
                comic = await sHentai.getDoujin(value);

                const idEmbed = comic.status ? errorEmbed('看起來你要找的東西不在這裡!') : setComicEmbed(comic);

                await interaction.update({ embeds: [idEmbed], components: [] });
            } else {
                await interaction.update({ embeds: [errorEmbed('請輸正整數!')], components: [] });
            }
            break;
        case 'comicKeywordModel':
            comic = await sHentai.search(value);

            const keyWordEmbed = comic.status ? errorEmbed('看起來你要找的東西不在這裡!') : setMoreComicEmbed(comic.results);

            await interaction.update({ embeds: [keyWordEmbed], components: [] });
            break;
        case 'comicAuthorModel':
            comic = await sHentai.byAuthor(value);

            const authorEmbed = comic.status ? errorEmbed('看起來你要找的東西不在這裡!') : setMoreComicEmbed(comic.results);

            await interaction.update({ embeds: [authorEmbed], components: [] });
            break;
        }
    }
};