const { EmbedBuilder } = require("@discordjs/builders");
const { Client, Interaction } = require("discord.js");

module.exports = {
    name: `interactionCreate`,
    once: false,

    /**
     * 
     * @param {Client} bot 
     * @param {Interaction} interaction 
     */

    async action(bot, interaction) {
        if(interaction.isCommand()) {
            const { commandName, options, member } = interaction;

            const cmd = bot.commands.get(commandName);
            if(!cmd) return interaction.reply({ embeds: [new EmbedBuilder().setColor(0xff0000).setDescription(`❌ Dieser Befehl existiert nicht!`)] });

            try {
                cmd.execute(bot, interaction, options, member);
            } catch(err) {
                interaction.reply({ embeds: [new EmbedBuilder().setColor(0xff0000).setTitle(`Ein Fehler ist aufgetreten! ❌`).setDescription(err)] });
            }
        }
    }
}