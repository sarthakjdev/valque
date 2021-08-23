const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')

const thumbnail = process.env.Thumbnail 
const startPlayingButton = new MessageButton().setCustomId('startPlaying').setLabel('Start Playing').setStyle('SUCCESS')
const startPlayingRow = new MessageActionRow().addComponents(startPlayingButton)
const startPlayingembed = new MessageEmbed().setAuthor('QUE Bot',`${thumbnail}`).setDescription('Tap on the button below to initiate the queuing process .').setThumbnail(`${thumbnail}`)

module.exports = {startPlayingRow , startPlayingembed} ; 