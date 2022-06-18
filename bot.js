const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const { TOKEN } = require('./assets/config.json');

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
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '執行此命令時出錯!', ephemeral: true });
        }
    } else if (interaction.isSelectMenu()) {
        let menu;

        if (interaction.customId === 'comicMenu') {
            menu = require('./src/comic/menu');
        }

        if (!menu) return;

        try {
            await menu.execute(interaction);
        } catch (error) {
            console.error(error);
            interaction.reply({ content: '執行此命令時出錯!', ephemeral: true });
        }
    } else if (interaction.isModalSubmit()) {
        let modal;

        const customId = [
            'comicIdModel',
            'comicKeywordModel',
            'comicAuthorModel'
        ];

        if (customId.includes(interaction.customId)) {
            modal = require('./src/comic/modal')
        }

        if (!modal) return;

        try {
            await modal.execute(interaction);
        } catch (error) {
            console.error(error);
            interaction.reply({ content: '執行此命令時出錯!', ephemeral: true });
        }
    }
});

client.login(TOKEN).then(/* ... */).catch(console.error);