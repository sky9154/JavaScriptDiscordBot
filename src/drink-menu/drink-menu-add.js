const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const isImage = require("is-image");
const dayjs = require('dayjs');
const mysql = require('mysql');
const { DrinkMenu } = require('../../assets/permission.json');

require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('drink-menu-add')
        .setDescription('新增手搖飲料菜單')
        .addStringOption((option) => option.setName('name').setDescription('店名').setRequired(true))
        .addStringOption((option) => option.setName('menu').setDescription('菜單').setRequired(true)),
    async execute (interaction) {
        if (DrinkMenu.Add.includes(interaction.user.id)) {
            const connection = mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: 'discord-bot'
            });

            connection.connect();

            const name = interaction.options.getString('name');
            const menu = interaction.options.getString('menu');

            if (isImage(menu)) {
                const menuCheckSql = `SELECT * FROM drink_menu WHERE name LIKE '%${name}%' LIMIT 1`;

                const now = dayjs(new Date()).format('YYYY/MM/DD HH:mm:ss') ;
                const menuAddSql = `INSERT INTO drink_menu VALUES ('${name}', '${menu}', '${now}', '${interaction.user.id}')`;

                connection.query(menuCheckSql, async (error, result) => {
                    if (typeof(result[0]) === 'undefined') {
                        connection.query(menuAddSql, async (error) => {
                            if (!error) {
                                const drinkEmbed = new MessageEmbed()
                                    .setTitle('手搖飲料菜單')
                                    .setDescription(`${name} - 菜單新增成功!`)
                                    .setColor('#ffcc80')
                                    .setImage(menu)
                                    .setFooter({ text: 'Copyright © 2022 oF' });

                                await interaction.reply({ embeds: [drinkEmbed] });
                            } else {
                                const drinkEmbed = new MessageEmbed()
                                    .setTitle('手搖飲料菜單')
                                    .setDescription(`${name} - 菜單新增失敗!\n${error}`)
                                    .setColor('#f23857')
                                    .setFooter({ text: 'Copyright © 2022 oF' });

                                await interaction.reply({ embeds: [drinkEmbed] });
                            }
                        });
                    } else {
                        const drinkEmbed = new MessageEmbed()
                            .setTitle('手搖飲料菜單')
                            .setDescription(`${name} - 菜單已存在!`)
                            .setColor('#f23857')
                            .setFooter({ text: 'Copyright © 2022 oF' });

                        await interaction.reply({ embeds: [drinkEmbed] });
                    }
                });
            } else {
                const drinkEmbed = new MessageEmbed()
                    .setTitle('手搖飲料菜單')
                    .setDescription(`請確認菜單網址是否正確!`)
                    .setColor('#f23857')
                    .setFooter({ text: 'Copyright © 2022 oF' });

                await interaction.reply({ embeds: [drinkEmbed] });
            }

            connection.end();
        } else {
            await interaction.reply({ content: '你沒有權限使用這個指令!' });
        }
    }
};