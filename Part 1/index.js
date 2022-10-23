const { Client, IntentsBitField, Collection } = require(`discord.js`);
const bot = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages
    ],
    allowedMentions: {
        parse: ["everyone"],
        repliedUser: true
    }
});
const { readdirSync } = require(`fs`);
const { token } = require(`./config.json`);

bot.commands = new Collection();

readdirSync(`./src/commands`).filter(file => file.endsWith(`.js`)).forEach((file) => {
    const command = require(`./src/commands/${file}`);

    bot.commands.set(command.name, command);
})

readdirSync(`./src/events`).filter(file => file.endsWith(`.js`)).forEach((file) => {
    const event = require(`./src/events/${file}`);

    if(event.once) {
        bot.once(event.name, (...args) => event.action(bot, ...args));
    } else {
        bot.on(event.name, (...args) => event.action(bot, ...args));
    }
})

bot.login(token);