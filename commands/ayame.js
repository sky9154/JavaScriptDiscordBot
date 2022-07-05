const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const axios = require("axios");
const dayjs = require('dayjs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ayame')
        .setDescription('百鬼開台計時器'),
    async execute (interaction) {
        /**
         * 計算百鬼距離上次開台經過時間
         * @param startDate 上次開台時間
         * @returns {`${number} 天 ${string} 時 ${string} 分 ${string} 秒`} 累計時間
         */
        const setDate = (startDate) => {
            let intSec = dayjs().diff(startDate, 'second');
            let intMin = Math.floor(intSec / 60);
            let intHour = Math.floor(intMin / 60);
            let intDay = Math.floor(intHour / 24);

            intSec -= (intMin * 60)
            intMin -= (intHour * 60);
            intHour -= (intDay * 24);

            const strSec = intSec.toString().padStart(2, '0');
            const strMin = intMin.toString().padStart(2, '0');
            const strHour = intHour.toString().padStart(2, '0');

            return `${intDay} 天 ${strHour} 時 ${strMin} 分 ${strSec} 秒`;
        }

        const dataUrl='https://script.google.com/macros/s/AKfycbydoxbJd6RJhJIe6tg8Q6IVKNHObuB8iSLyYbyoCBEQmhfP3tAxlyMtm-ozF8ptTJCd/exec';

        axios.get(dataUrl).then(async (res) => {
            const image = {
                thumbnail: 'https://cdn.discordapp.com/attachments/900320455477579836/983666002493591562/nakiri.jpg',
                icon: 'https://nakiri.canaria.cc/src/logo/apple-touch-icon-next.png'
            };

            const liveLinkBtn = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setURL(res.data.vidi.replace('www.youtube.com/embed', 'youtu.be'))
                        .setStyle('LINK')
                        .setLabel('𝗟𝗜𝗡𝗞')
                        .setEmoji('<a:blobreach:983798045760159847>'));

            switch (res.data.live) {
                case 'none':
                    const startDate = dayjs(res.data.pubt);
                    const noneEmbed = new MessageEmbed()
                        .setTitle('百鬼今天開台了嗎？')
                        .setDescription(`距離百鬼上次開台\n已經過了 ${setDate(startDate)}`)
                        .setColor('#f0c6e5')
                        .setThumbnail(image.thumbnail)
                        .setFooter({
                            text: 'Powered by nakiri.canaria.cc',
                            iconURL: image.icon
                        });

                    await interaction.reply({ embeds: [noneEmbed], components: [liveLinkBtn] });
                    break;
                case 'upcoming':
                    const upcomingEmbed = new MessageEmbed()
                        .setTitle('百鬼今天開台了嗎？')
                        .setDescription(`百鬼就快開台了，還不快去待機！`)
                        .setColor('#f0c6e5')
                        .setThumbnail(image.thumbnail)
                        .setFooter({
                            text: 'Powered by nakiri.canaria.cc',
                            iconURL: image.icon
                        });

                    await interaction.reply({ embeds: [upcomingEmbed], components: [liveLinkBtn] });
                    break;
                case 'live':
                    const liveEmbed = new MessageEmbed()
                        .setTitle('百鬼今天開台了嗎？')
                        .setDescription(`百鬼正在開台，還不快去看！`)
                        .setColor('#f0c6e5')
                        .setThumbnail(image.thumbnail)
                        .setFooter({
                            text: 'Powered by nakiri.canaria.cc',
                            iconURL: image.icon
                        });

                    await interaction.reply({ embeds: [liveEmbed], components: [liveLinkBtn] });
                    break;
                default:
                    const errorEmbed = new MessageEmbed()
                        .setTitle('百鬼今天開台了嗎？')
                        .setDescription('今天機器人也要摸余啦!')
                        .setColor('#f0c6e5')
                        .setThumbnail(image.thumbnail)
                        .setFooter({
                            text: 'Powered by nakiri.canaria.cc',
                            iconURL: image.icon
                        });

                    await interaction.reply({ embeds: [errorEmbed] });
                    break;
                }
            }
        ).catch((error) => console.log(error));
    }
};