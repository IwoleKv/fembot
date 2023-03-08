const {
	SlashCommandBuilder,
	ChatInputCommandInteraction,
	AutocompleteInteraction,
	EmbedBuilder,
	Events,
	codeBlock,
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
					option
						.setName('tekst')
						.setDescription('Tekst wiadomości')
						.setMaxLength(4096)
						.setRequired(true),
				)
				.addStringOption((option) =>
					option
						.setName('kolor')
						.setDescription('czerwony')
						.setRequired(false)
						.setAutocomplete(true),
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
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('codeblock'))

	/**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {AutocompleteInteraction} interaction
   */

	async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused();
		const choices = [
			'losowy',
			'czerwony',
			'niebieski',
			'czarny',
			'biały',
			'fioletowy',
			'różowy',
			'pomarańczowy',
			'żółty',
			'zielony',
		];
		const filtered = choices.filter((choice) =>
			choice.startsWith(focusedValue),
		);
		await interaction.respond(
			filtered.map((choice) => ({ name: choice, value: choice, inline: true })),
		);
	},

	async execute(interaction) {
		let kolor = interaction.options.getString('kolor');
		const emb = interaction.options.getSubcommand('tabelka');
		const codeblock = interaction
		const txt_ = interaction.options.getString('tekst');
		const channel_ =
      interaction.options.getChannel('kanał') || interaction.channel;

		switch (kolor) {
		case 'czerwony':
			kolor = '0xff3333';
			break;
		case 'niebieski':
			kolor = '0x0095ff';
			break;
		case 'czarny':
			kolor = '0x000000';
			break;
		case 'biały':
			kolor = '0xFFFFFF';
			break;
		case 'fioletowy':
			kolor = '0x9400d9';
			break;
		case 'różowy':
			kolor = '0xff0099';
			break;
		case 'pomarańczowy':
			kolor = '0xff9100';
			break;
		case 'żółty':
			kolor = '0xfaed5a';
			break;
		case 'zielony':
			kolor = '0x00b809';
			break;
		case 'losowy':
			kolor = 'Random';
			break;
		default:
			kolor = 'Random';
			break;
		}

		const tab = new EmbedBuilder().setColor(`${kolor}`)
			// .addFields(
			// 	{ name: '** **', value: txt_ });
			.setDescription(txt_);
		if (emb === 'tabelka') {
			await interaction.reply({
				content:
          '(zjebane API DC - ignoruj, tylko ty to widzisz)',
				ephemeral: true,
			});
			await channel_.send({ embeds: [tab] });
		}else if(){

		}else {
			await interaction.reply({
				content:
          '(zjebane API DC - ignoruj, tylko ty to widzisz)',
				ephemeral: true,
			});
			await channel_.send(txt_);
		}
	},
};
