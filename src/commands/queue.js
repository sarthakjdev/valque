'use strict';
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('FOr other people to initiate te '),
	async execute(interaction) {
		await interaction.reply('');
	},
};