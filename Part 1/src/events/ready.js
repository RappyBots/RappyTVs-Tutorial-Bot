const { Client, ActivityType, REST, Routes } = require("discord.js")

module.exports = {
    name: `ready`,
    once: true,

    /**
     * 
     * @param {Client} bot 
     */

    action(bot) {
        console.log(`Bot wurde erfolgreich eingeloggt als ${bot.user.tag}`);

        bot.user.setActivity({
            name: `/help`,
            type: ActivityType.Playing
        });
        
        registerCommands(bot);
    }
}

/**
 * 
 * @param {Client} bot 
 */

async function registerCommands(bot) {
    const rest = new REST({ version: '10' }).setToken(bot.token);

    const commands = [];
    bot.commands.forEach((cmd) => {
        commands.push({
            name: cmd.name,
            description: cmd.description,
            options: cmd.options
        });
    });

    try {
        await rest.put(Routes.applicationCommands(bot.user.id), { body: commands }).catch(err => console.error);
        console.log(`Alle Befehle erfolgreich registriert!`);
    } catch(err) {
        console.error(err);
    }
}