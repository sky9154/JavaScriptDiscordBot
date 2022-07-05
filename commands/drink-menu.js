const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const mysql = require('mysql');
const dayjs = require("dayjs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('drink-menu')
        .setDescription('查詢手搖飲料菜單')
        .addStringOption((option) => option.setName('name').setDescription('店名').setRequired(true)),
    async execute (interaction) {
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: 'discord-bot'
        });

        connection.connect();

        const name = interaction.options.getString('name');

        if (name.length >= 2) {
            const menuSearchSql = `SELECT * FROM drink_menu WHERE name LIKE '%${name}%' LIMIT 1`;

            connection.query(menuSearchSql, async (error, result) => {
                if (!error) {
                    if (typeof(result) !== 'undefined') {
                        const date = dayjs(result[0].date).format('YYYY/MM/DD HH:mm:ss Z[Z]');

                        const drinkEmbed = new MessageEmbed()
                            .setTitle('手搖飲料菜單')
                            .setDescription(`店名: ${result[0].name}\n`)
                            .addField('最後更新時間', date)
                            .setColor('#ffcc80')
                            .setImage(result[0].image)
                            .setFooter({ text: 'Copyright © 2022 oF' });

                        await interaction.reply({ embeds: [drinkEmbed] });
                    } else {
                        const drinkEmbed = new MessageEmbed()
                            .setTitle('手搖飲料菜單')
                            .setDescription('目前尚無菜單!')
                            .setColor('#ff4444')
                            .setFooter({ text: 'Copyright © 2022 oF' });

                        await interaction.reply({ embeds: [drinkEmbed] });
                    }
                } else {
                    const drinkEmbed = new MessageEmbed()
                        .setTitle('手搖飲料菜單')
                        .setDescription(error)
                        .setColor('#ff4444')
                        .setFooter({ text: 'Copyright © 2022 oF' });

                    await interaction.reply({ embeds: [drinkEmbed] });
                }
            });
        } else {
            const drinkEmbed = new MessageEmbed()
                .setTitle('手搖飲料菜單')
                .setDescription('請輸入2位以上的關鍵字進行查詢!')
                .setColor('#ff4444')
                .setFooter({ text: 'Copyright © 2022 oF' });

            await interaction.reply({ embeds: [drinkEmbed] });
        }

        connection.end();
    }
};