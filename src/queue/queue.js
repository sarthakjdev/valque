const Discord = require('discord.js');
const { MessageActionRow, MessageButton , MessageComponentInteraction } = require('discord.js');

    const queueButtonsRow = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setCustomId('queue')
        .setLabel('QUEUE')
        .setStyle('SUCCESS') , 
        new MessageButton()
        .setCustomId('cancel')
        .setLabel('CANCEL')
        .setStyle('DANGER') 
        .setDisabled(true),
        
    )

    const  queueEmbed =  new Discord.MessageEmbed()
    .setTitle('Click on the queue button to start a queue search.')
    .setAuthor( 'Que')
    .setColor('#ffffff')
    .setDescription('Click on the below given button to enter a queue . ')
    


    module.exports = {queueButtonsRow  , queueEmbed} ; 
