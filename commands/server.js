const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Informacja o serwerze'),
	async execute(interaction) {
		await interaction.reply(`Serwer ${interaction.guild.name} posiada ${interaction.guild.memberCount} członków.`);
	},
};