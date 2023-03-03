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
		.setName('ping')
		.setDescription('test ping')
		.addUserOption((option) =>
			option
				.setName('użytkownik')
				.setDescription('Oznacz użytkownika')
				.setRequired(true),
		)
		.addNumberOption((option) =>
			option
				.setName('ilość')
				.setDescription('Ile razy <1-50>')
				.setMinValue(1)
				.setMaxValue(50)
				.setRequired(true),
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
		// const wait = require('node:timers/promises').setTimeout;
		const int = interaction.options.getNumber('ilość');
		const member = interaction.options.getUser('użytkownik');
		const input = interaction.options.getString('tekst');
		await interaction
			.reply({ content: 'Wycisz discorda', ephemeral: true });
		await interaction
			.deleteReply();
		console.log(interaction.user.tag);
		for (let step = 1; step <= int; step++) {
			await interaction
				.followUp(`${member} ${input === null ? '' : input} \`${step}\``)
				.then((msg) => {
					msg.delete();
				});
		}
	},
};
