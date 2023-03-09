const {
	SlashCommandBuilder,
	ChatInputCommandInteraction,
	AutocompleteInteraction,
	EmbedBuilder,
	Events,
	codeBlock,
	bold,
	italic,
	strikethrough,
	underscore,
	spoiler,
	quote,
	blockQuote,
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
						.setMaxLength(6000)
						.setRequired(true),
				)
				.addChannelOption((option) =>
					option
						.setName('kanał')
						.setDescription('Wybrany kanał')
						.setRequired(false),
				)
				.addBooleanOption((option) =>
					option.setName('spoiler').setDescription('spoiler').setRequired(false),
				)
				.addBooleanOption((option) =>
					option
						.setName('pogrubienie')
						.setDescription('spoiler')
						.setRequired(false),
				)
				.addBooleanOption((option) =>
					option.setName('kursywa').setDescription('spoiler').setRequired(false),
				),
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('codeblock')
				.setDescription('codeblock')
				.addStringOption((option) =>
					option
						.setName('tekst')
						.setDescription('Tekst wiadomości')
						.setMaxLength(6000)
						.setRequired(true),
				)
				.addChannelOption((option) =>
					option
						.setName('kanał')
						.setDescription('Wybrany kanał')
						.setRequired(false),
				)
				.addBooleanOption((option) =>
					option.setName('spoiler').setDescription('spoiler').setRequired(false),
				)
				.addBooleanOption((option) =>
					option
						.setName('pogrubienie')
						.setDescription('spoiler')
						.setRequired(false),
				)
				.addBooleanOption((option) =>
					option.setName('kursywa').setDescription('spoiler').setRequired(false),
				),
		),

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
		// function splitMessage(str, size) {
		// 	const numChunks = Math.ceil(str.length / size);
		// 	const chunks = new Array(numChunks);

		// 	for (let i = 0, c = 0; i < numChunks; ++i, c += size) {
		// 		chunks[i] = str.substr(c, size);
		// 	}

		// 	return chunks;
		// }
		// const messageChunks = splitMessage(txt_, 2000);

		let kolor = interaction.options.getString('kolor');
		const txt_normal = interaction.options.getString('tekst');
		const emb = interaction.options.getSubcommand('tabelka');
		const kursywa = interaction.options.getBoolean('kursywa');
		const spoiler_ = interaction.options.getBoolean('spoiler');
		const pogrubienie = interaction.options.getBoolean('pogrubienie');
		const codeblock = interaction.options.getSubcommand('codeblock');
		const channel_ =
      interaction.options.getChannel('kanał') || interaction.channel;

		function zmientxt(txt) {
			if (kursywa === true) {
				txt = italic(txt);
			}
			if (pogrubienie === true) {
				txt = bold(txt);
			}
			if (spoiler_ === true) {
				txt = spoiler(txt);
			}
			return txt;
		}

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

		if (emb === 'tabelka') {
			const tab = new EmbedBuilder()
				.setColor(`${kolor}`)
				.setDescription(txt_normal);
			await interaction.reply({
				content: '(zjebane API DC - ignoruj, tylko ty to widzisz)',
				ephemeral: true,
			});
			await channel_.send({ embeds: [tab] });
		}
		else if (codeblock === 'codeblock') {
			const maxLeng = 1991;
			const txtArray = [];
			let txtArrayCut = txt_normal;
			let i = 0;

			while (txtArrayCut.length > 0) {
				txtArray[i] = txtArrayCut.slice(0, maxLeng);
				txtArrayCut = txtArrayCut.slice(maxLeng);
				i++;
			}

			await interaction.reply({
				content: '(zjebane API DC - ignoruj, tylko ty to widzisz)',
				ephemeral: true,
			});
			txtArray.forEach((element) => {
				channel_.send(codeBlock(element));
			});
		}
		else {
			const maxLeng = 1991;
			const txtArray = [];
			let txtArrayCut = txt_normal;
			let i = 0;

			while (txtArrayCut.length > 0) {
				txtArray[i] = txtArrayCut.slice(0, maxLeng);
				txtArrayCut = txtArrayCut.slice(maxLeng);
				i++;
			}

			await interaction.reply({
				content: '(zjebane API DC - ignoruj, tylko ty to widzisz)',
				ephemeral: true,
			});
			txtArray.forEach((element) => {
				// const test = element;
				// if (true) {
				// 	element = bold(element);
				// }
				// if (true) {
				// 	element = spoiler(element);
				// }
				channel_.send(zmientxt(element));
			});
		}
	},
};
