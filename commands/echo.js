const {
	SlashCommandBuilder,
	ChatInputCommandInteraction,
	AutocompleteInteraction,
	EmbedBuilder,
	Events
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Wyślij podaną wiadomość')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('tabelka')
				.setDescription('kolor')
				.addStringOption((option) =>
					option.setName('kolor').setDescription('kolor').setRequired(true)
						.setAutocomplete(true))
				.addStringOption((option) =>
					option
						.setName('tekst')
						.setDescription('Tekst wiadomości')
						.setRequired(true),
				)
				.addChannelOption((option) =>
					option
						.setName('kanał')
						.setDescription('Wybrany kanał')
						.setRequired(false),
				),
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('normalna')
				.setDescription('Bez tabelki')
				.addStringOption((option) =>
					option
						.setName('tekst')
						.setDescription('Tekst wiadomości')
						.setRequired(true),
				)
				.addChannelOption((option) =>
					option
						.setName('kanał')
						.setDescription('Wybrany kanał')
						.setRequired(false),
				),
		),
	/**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {AutocompleteInteraction} interaction
   */
	async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused();
		const choices = ['czerwony', 'niebieski', 'zielony', 'żółty', 'purple', 'pink'];
		const filtered = choices.filter((choice) =>
			choice.startsWith(focusedValue),
		);
		await interaction.respond(
			filtered.map((choice) => ({ name: choice, value: choice })),
		);
	},
	async execute(interaction) {
		const colors = [
			{ value: 0xED4245, name: 'czerwony' },
			{ value: 0x57F287, name: 'zielony' },
			{ value: 0xFEE75C, name: 'żółty' },
		];
		// eslint-disable-next-line no-undef
		const kolor = interaction.options.getString('kolor');
		const emb = interaction.options.getSubcommand('tabelka');
		const channel_ =
      interaction.options.getChannel('kanał') || interaction.channel;
		const txt_ = interaction.options.getString('tekst');
		const tab = {
			color: kolor,
			title: txt_,
		};
		if (emb === 'tabelka') {
			await interaction.reply({
				content:
          'Dummy message bo API jest zjebane :), ignoruj i tak tylko ty to widzisz',
				ephemeral: true,
			});
			await channel_.send({ embeds: [tab] });
		}
		else {
			await interaction.reply({
				content:
          'Dummy message bo API jest zjebane :), ignoruj i tak tylko ty to widzisz',
				ephemeral: true,
			});
			await channel_.send(txt_);
		}
	},
};
