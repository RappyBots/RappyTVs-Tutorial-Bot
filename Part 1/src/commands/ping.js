const { Client, CommandInteraction, CommandInteractionOptionResolver, GuildMember, EmbedBuilder } = require("discord.js");

module.exports = {
    name: `ping`,
    description: `Zeigt den Ping vom Bot an.`,
    options: [],
    help: true,

    /**
     * 
     * @param {Client} bot 
     * @param {CommandInteraction} interaction 
     * @param {CommandInteractionOptionResolver} options 
     * @param {GuildMember} member 
     */

    async execute(bot, interaction, options, member) {
        const defer = await interaction.deferReply({ fetchReply: true });

        const ping = defer.createdTimestamp - interaction.createdTimestamp;

        const embed = new EmbedBuilder()
        .setTitle(`Pong 🏓`)
        .setColor(0x0000ee)
        .addFields([
            {
                name: `Bot Ping`,
                value: `\`\`\`${ping}ms\`\`\``,
                inline: true
            },
            {
                name: `API Ping`,
                value: `\`\`\`${bot.ws.ping}ms\`\`\``,
                inline: true
            }
        ]);

        interaction.editReply({ embeds: [embed] });
    }
}