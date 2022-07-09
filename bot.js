const { Client, Collection, Intents } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const mysql = require('mysql');

require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    client.user.setActivity('Sword Art Online');
    console.log(`機器人 ${client.user.tag} 正在運行中!`);

    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'discord-bot'
    });

    connection.connect();
    connection.query('SELECT 1 + 1 AS solution', async (error) => console.log(`${error ? error : '資料庫連線成功!'}`));
    connection.end();
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({content: '執行此命令時出錯!', ephemeral: true});
        }
    } else if (interaction.isButton()) {
        let button;

        if (!button) return;

        try {
            await button.execute(interaction);
        } catch (error) {
            console.error(error);
            interaction.reply({ content: '執行此命令時出錯!', ephemeral: true });
        }
    }
});

client.login(process.env.TOKEN).then(/* ... */).catch(console.error);