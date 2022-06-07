const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require("axios");
const dayjs = require('dayjs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ayame')
        .setDescription('百鬼開台計時'),
    async execute(interaction) {
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
        axios.get(dataUrl)
            .then((res) => {
                switch (res.data.live) {
                    case 'none':
                        const startDate = dayjs(res.data.pubt);
                        const noneEmbed = new MessageEmbed()
                            .setTitle('百鬼今天開台了嗎？')
                            .setDescription(`
                                距離百鬼上次開台\n已經過了 ${setDate(startDate)}\n最後直播連結：${res.data.vidi.replace('www.youtube.com/embed', 'youtu.be')}
                            `)
                            .setColor('0xf0c6e5')
                            .setThumbnail('https://cdn.discordapp.com/attachments/900320455477579836/983666002493591562/nakiri.jpg');
                        return interaction.reply({ embeds: [noneEmbed] });
                    case 'upcoming':
                        const upcomingEmbed = new MessageEmbed()
                            .setTitle('百鬼今天開台了嗎？')
                            .setDescription(`
                                百鬼就快開台了，還不快去待機！\n直播連結：${res.data.vidi.replace('www.youtube.com/embed', 'youtu.be')}
                            `)
                            .setColor('0xf0c6e5')
                            .setThumbnail('https://cdn.discordapp.com/attachments/900320455477579836/983666002493591562/nakiri.jpg');
                        return interaction.reply({ embeds: [upcomingEmbed] });
                    case 'live':
                        const liveEmbed = new MessageEmbed()
                            .setTitle('百鬼今天開台了嗎？')
                            .setDescription(`
                                百鬼正在開台，還不快去看！\n直播連結：${res.data.vidi.replace('www.youtube.com/embed', 'youtu.be')}
                            `)
                            .setColor('0xf0c6e5')
                            .setThumbnail('https://cdn.discordapp.com/attachments/900320455477579836/983666002493591562/nakiri.jpg');
                        return interaction.reply({ embeds: [liveEmbed] });
                    default:
                        const errorEmbed = new MessageEmbed()
                            .setTitle('百鬼今天開台了嗎？')
                            .setDescription('今天機器人也要摸余啦!')
                            .setColor('0xf0c6e5')
                            .setThumbnail('https://cdn.discordapp.com/attachments/900320455477579836/983666002493591562/nakiri.jpg');
                        return interaction.reply({ embeds: [errorEmbed] });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
};