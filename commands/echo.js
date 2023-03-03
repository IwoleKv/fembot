const {
	SlashCommandBuilder,
	ChatInputCommandInteraction,
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Wyślij podaną wiadomość')
		.addStringOption((option) =>
			option
				.setName('tekst')
				.setDescription('Tekst wiadomości')
				.setRequired(true),
		)
		.addChannelOption((option) =>
			option.setName('kanał').setDescription('Wybrany kanał').setRequired(false),
		),
	/**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
	async execute(interaction) {
		const channel_ = interaction.options.getChannel('kanał') || interaction.channel;
		const txt_ = interaction.options.getString('tekst');
		await interaction.reply({
			content:
        'Dummy message bo API jest zjebane :), ignoruj i tak tylko ty to widzisz',
			ephemeral: true,
		});
		await channel_.send(txt_);
	},
};
