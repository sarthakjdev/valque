const { MessageActionRow, MessageButton , MessageEmbed } = require('discord.js')
const thumbnail = process.env.Thumbnail


const checkinButton = new MessageButton().setStyle('LINK').setLabel('Check-In').setURL('https://google.com')
const checkinRow = new MessageActionRow().addComponents(checkinButton)
const checkinEmbed = new MessageEmbed().setAuthor('Que Bot', `${thumbnail}`).setColor('WHITE').setDescription('Check-in to continue the process.')
module.exports = { checkinRow , checkinEmbed } ; 