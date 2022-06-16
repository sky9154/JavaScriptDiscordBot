const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const { TOKEN } = require('./assets/config.json');

const mqtt = require('mqtt');
const mqttClient  = mqtt.connect('mqtt://163.17.21.67:1883');

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
        let func;

        switch (interaction.customId) {
            case 'comicSelect':
                func = require('./src/comic');
                break;
            case 'mqttSelect':
                func = require('./src/mqtt');
                break;
            default:
                break;
        }

        if (!func) return;

        try {
            await func.execute(interaction);
        } catch (error) {
            console.error(error);
            interaction.reply({ content: '執行此命令時出錯!', ephemeral: true });
        }
    }
});

mqttClient.on('connect', () => mqttClient.subscribe(['第8組/資料', '第8組'], () => console.log("訂閱 topic 成功!")));
mqttClient.on('message', (topic, payload) => {
    if (topic === '第8組/資料') {
        const msg = payload.toString();
        const msgArr = msg.split(' ');
        client.channels.fetch('985743358913830952').then((channel) => {
            switch (msgArr[0]) {
            case 'temperature':
                channel.send(`溫度: ${Number(msgArr[1])} °C`);
                break;
            case 'humidity':
                channel.send(`濕度: ${Number(msgArr[1])} %`);
                break;
            case 'luminance':
                channel.send(`亮度: ${Number(msgArr[1])} LUX`);
                break;
            }
        });
    }
});

client.login(TOKEN).then(/* ... */).catch(console.error);