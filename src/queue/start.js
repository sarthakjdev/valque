const Discord = require("discord.js");
const {
  MessageActionRow,
  MessageButton,
  MessageComponentInteraction,
} = require("discord.js");
const thumbnail = process.env.Thumbnail ; 
const setupEmbed = new  Discord.MessageEmbed()
.setTitle('Welcome to the queuing zone')
.setAuthor( 'Que', `${thumbnail}`)
.setColor('#ffffff')
.setDescription('Click on the below given button to enter a queue . ')
.setThumbnail(`${thumbnail}`);


const setupButtonRow = new MessageActionRow()
.addComponents(
    new MessageButton()
    .setCustomId('start')
    .setLabel('INITIATE QUEUE PROCESS')
    .setStyle('PRIMARY') 
)

    module.exports = { setupEmbed, setupButtonRow }