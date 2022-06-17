const path = require("node:path");
const fs = require("node:fs");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('drink-menu')
        .setDescription('查詢手搖飲料菜單')
        .addStringOption((option) => option.setName('name').setDescription('店名').setRequired(true)),
    async execute(interaction) {
        const name = interaction.options.getString('name');
        const pathArr = path.join(__dirname, '../assets/drinkMenu');
        const fileArr = fs.readdirSync(pathArr).filter(file => file.endsWith('.png'));

        const getDrinkEmbed = async () => {
            for (const file of fileArr) {
                if (file.toLowerCase().includes(name.toLowerCase())) {
                    const filePath = path.join(pathArr, file);
                    const attachment = new MessageAttachment(filePath, 'name.png');
                    const drinkEmbed = new MessageEmbed()
                        .setTitle('手搖飲料菜單')
                        .setDescription(`店名: ${file.replace('.png', '')}`)
                        .setColor('#ffcc80')
                        .setImage('attachment://name.png')
                    await interaction.reply({embeds: [drinkEmbed], files: [attachment]});
                    return true;
                }
            }
        }

        if (!await getDrinkEmbed()) {
            const drinkEmbed = new MessageEmbed()
                .setTitle('手搖飲料菜單')
                .setDescription('目前尚未有菜單!')
                .setColor('#ff4444')
            await interaction.reply({embeds: [drinkEmbed]});
        }
    }
};