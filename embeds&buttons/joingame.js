const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')

const thumbnail = process.env.Thumbnail



// import inviteLink from '../commands/queue'
const joingameButton = new MessageButton().setLabel('Join-Game').setStyle('LINK').setURL(`https://google.com`)
const joingameRow = new MessageActionRow().addComponents(joingameButton)
const joingameembed = new MessageEmbed().setAuthor('QUE Bot', `${thumbnail}`).setColor('WHITE').setDescription('``MATCH FOUND ! `` \n NOW YOU CAN JOIN THE GAME BY CLICK ON THE BELOW . ').setThumbnail(`${thumbnail}`)

module.exports = { joingameRow, joingameembed  }
