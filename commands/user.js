const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Informacja o użytkowniku'),
	async execute(interaction) {

const exampleEmbed = new EmbedBuilder()
	.setColor(0xff006f)
	.setTitle('Informacje:')
	.setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.member.displayAvatarURL()}` })
	.addFields(
		{ name: 'Pseudonim', value: `\`${interaction.user.username}\``, inline: true },
		{ name: 'ID', value: `\`${interaction.member.id}\``, inline: true },
		{ name: 'Avatar', value: ' ', inline: false },
	)
	.setImage(`${interaction.member.displayAvatarURL()}?size=512`)
	.setTimestamp()
	.setFooter({ text: 'WIP - IwoleK', iconURL: 'https://cdn-icons-png.flaticon.com/512/8111/8111673.png' });
		
		await interaction.reply({embeds: [exampleEmbed]});
	},
};