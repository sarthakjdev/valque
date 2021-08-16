const Command = require('../Structures/command.js');
const Discord = require('discord.js');
const Client = require('../Structures/Client.js');
const { MessageActionRow, MessageButton , MessageComponentInteraction } = require('discord.js');
const interaction = require('../Events/interactionCreate.js')
const thumbnail = process.env.Thumbnail ; 
const queueInteractionMsg= require('../queue/queue.js')
module.exports = new Command( {
    name :'setup',
    description:'For admin to initiate ',
    type:"BOTH",
    slashCommandOptions:[],
    async run ( interaction  , args , client){
        
        const setupembed = new  Discord.MessageEmbed()
        .setTitle('Welcome to the queuing zone')
        .setAuthor( 'Que', `${thumbnail}`)
        .setColor('#ffffff')
        .setDescription('Click on the below given button to enter a queue . ')
        .setThumbnail(`${thumbnail}`)
        // setupembed.setCustomId('start')
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('primary')
            .setLabel('INITIATE QUEUE PROCESS')
            .setStyle('PRIMARY') 
            
        )
        interaction.reply({embeds : [setupembed], components:[row]});
        
        const filter = i => interaction.isButton() ; 
        
        const collector = interaction.channel.createMessageComponentCollector({ max:3});
        collector.on('collect', i =>{
            if(i.user.id === interaction.author.id){
                i.reply({ embeds:[queueInteractionMsg.queueEmbed] , components: [queueInteractionMsg.queueButtonsRow], ephemeral: true} )
            }
        })
        collector.on('end', (interaction)=>{
            console.log(interaction)
        })
    }
});