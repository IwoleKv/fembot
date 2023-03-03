const {
	SlashCommandBuilder,
	userMention,
	ChatInputCommandInteraction,
	messageLink,
	Client,
	ClientUser,
	ClientApplication,
	Message,
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('spam')
		.setDescription('spami :)')
		.addNumberOption((option) =>
			option
				.setName('ilość')
				.setDescription('Ile razy <1-50>')
				.setMinValue(1)
				.setMaxValue(50)
				.setRequired(true),
		)
		.addUserOption((optionx) =>
			optionx
				.setName('użytkownik1')
				.setDescription('Oznacz 1 użytkownika')
				.setRequired(true),
		)
		.addUserOption((option) =>
			option
				.setName('użytkownik2')
				.setDescription('Oznacz 2 użytkownika')
				.setRequired(false),
		)
		.addUserOption((option) =>
			option
				.setName('użytkownik3')
				.setDescription('Oznacz 3 użytkownika')
				.setRequired(false),
		)
		.addStringOption((option) =>
			option
				.setName('tekst')
				.setDescription('Wiadomość po oznaczeniu')
				.setMaxLength(2000)
				.setRequired(false),
		),
	/**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
	async execute(interaction) {
		const int = interaction.options.getNumber('ilość');
		const member1 = interaction.options.getUser('użytkownik1');
		const member2 = interaction.options.getUser('użytkownik2');
		const member3 = interaction.options.getUser('użytkownik3');
		const input = interaction.options.getString('tekst');
		await interaction.reply({ content: 'Wycisz discorda', ephemeral: true });
		await interaction.deleteReply();
		console.log(interaction.user.tag);
		for (let step = 1; step <= int; step++) {
			await interaction
				.followUp(
					`${member1} ${member2 === null ? '' : member2} ${
						member3 === null ? '' : member3
					} ${input === null ? '' : input} \`${step}\``,
				)
				.then((msg) => {
					msg.delete();
				});
		}
	},
};
