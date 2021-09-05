const { MessageActionRow, MessageButton } = require('discord.js')

const selectedMap = null
const availableMap = ['Bind', ' Heaven ', ' Split ', ' Ascent ', ' Icebox ', ' Breeze ']

const bind = new MessageButton().setCustomId('Bind').setLabel('Bind').setStyle('DANGER')
const heaven = new MessageButton().setCustomId('Heaven').setLabel('Heaven').setStyle('DANGER')
const split = new MessageButton().setCustomId('Split').setLabel('Split').setStyle('DANGER')
const ascent = new MessageButton().setCustomId('Ascent').setLabel('Ascent').setStyle('DANGER')
const icebox = new MessageButton().setCustomId('Icebox').setLabel('Icebox').setStyle('DANGER')
const breeze = new MessageButton().setCustomId('Breeze').setLabel('Breeze').setStyle('DANGER')

const mapActionRow = new MessageActionRow().addComponents(bind, heaven, split)
const mapActionRow2 = new MessageActionRow().addComponents(breeze, ascent, icebox)

module.exports = {
    mapActionRow, mapActionRow2, availableMap, selectedMap,
}
