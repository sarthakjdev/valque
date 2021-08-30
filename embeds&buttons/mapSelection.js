const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')

const thumbnail = process.env.Thumbnail

const mapSelectionEmbed = new MessageEmbed().setThumbnail(`${thumbnail}`).setAuthor('Que Bot', `${thumbnail}`).setColor('WHITE').setDescription(`Vote fro removing a map one by one`)

const bind = new MessageButton().setCustomId('Bind').setLabel('Bind').setStyle('SECONDARY')
const heaven = new MessageButton().setCustomId('Heaven').setLabel('Heaven').setStyle('SECONDARY')
const split = new MessageButton().setCustomId('Split').setLabel('Split').setStyle('SECONDARY')
const ascent = new MessageButton().setCustomId('Ascent').setLabel('Ascent').setStyle('SECONDARY')
const icebox = new MessageButton().setCustomId('Icebox').setLabel('Icebox').setStyle('SECONDARY')
const breeze = new MessageButton().setCustomId('Breeze').setLabel('Breeze').setStyle('SECONDARY')

const mapActionRow = new MessageActionRow().addComponents(bind,heaven, split, ascent, icebox) ; 
const mapActionRow2 = new MessageActionRow().addComponents(breeze);
module.exports = { mapSelectionEmbed, mapActionRow, mapActionRow2}
