const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')

const thumbnail = process.env.Thumbnail

const {gamesettingsInviteLink} = require('../embeds&buttons/createChannels.js')

const joingameButton = new MessageButton().setLabel('Join-Game').setStyle('LINK').setURL(`${gamesettingsInviteLink}`)
const joingameRow = new MessageActionRow().addComponents(joingameButton)
const joingameembed = new MessageEmbed().setAuthor('QUE Bot', `${thumbnail}`).setDescription('``MATCH FOUND ! `` \n NOW YOU CAN JOIN THE GAME BY CLICK ON THE BELOW . ').setThumbnail(`${thumbnail}`)

module.exports = { joingameRow, joingameembed }
