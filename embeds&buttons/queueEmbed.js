const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')

const thumbnail = process.env.Thumbnail

const queuePlayingButton = new MessageButton().setCustomId('startQueue').setLabel('Queue').setStyle('SUCCESS')
const queuePlayingRow = new MessageActionRow().addComponents(queuePlayingButton)
const queuePlayingembed = new MessageEmbed().setAuthor('QUE Bot', `${thumbnail}`).setColor('WHITE').setDescription('Click on the button below to search for a queue. And wait for enough players to join in the queue to start the matchmaking.').setThumbnail(`${thumbnail}`)


const editedQueueBtn = new MessageButton().setCustomId('editedQueue').setStyle('SUCCESS')
module.exports = { queuePlayingRow, queuePlayingembed }
