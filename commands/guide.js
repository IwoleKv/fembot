const { SlashCommandBuilder, AutoModerationActionExecution } = require('discord.js');
const { execute } = require('./spam');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('guide')
		.setDescription('test')
		.addStringOption((option) =>
			option
				.setName('kolor')
				.setDescription('test')
				.setAutocomplete(true)
				.setRequired(true),
		),
	async autocomplete(interaction, client) {
		const focusedValue = interaction.options.getFocused();
		const choices = ['red', 'blue', 'yellow', 'green', 'purple', 'pink'];
		const filtered = choices.filter((choice) =>
			choice.startsWith(focusedValue),
		);
		await interaction.respond(
			filtered.map((choice) => ({ name: choice, value: choice })),
		);
	},
	async execute(interaction, client) {
		const option = interaction.options.getString('kolor');
		await interaction.reply({ content: `testing: ${option}` });
	},
};