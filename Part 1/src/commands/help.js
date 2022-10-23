const { EmbedBuilder } = require("@discordjs/builders");
const { Client, CommandInteraction, CommandInteractionOptionResolver, GuildMember } = require("discord.js");

module.exports = {
    name: `help`,
    description: `Alle meine Befehle.`,
    options: [],
    help: false,

    /**
     * 
     * @param {Client} bot 
     * @param {CommandInteraction} interaction 
     * @param {CommandInteractionOptionResolver} options 
     * @param {GuildMember} member 
     */

    async execute(bot, interaction, options, member) {
        const embed = new EmbedBuilder()
        .setColor(0x0000ee)
        .setTitle(`**Alle meine Befehle:**`)

        bot.commands.forEach((cmd) => {
            if(cmd.help) {
                embed.addFields({
                    name: `\`/${cmd.name}\``,
                    value: cmd.description,
                    inline: true
                });
            }
        });

        interaction.reply({ embeds: [embed] });
    }
}