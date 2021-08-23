const { Collection } = require('discord.js')


// Importing buttons and embeds : 
const joinMsgComponents = require('./embeds&buttons/joingame')
const checkinMsgComponents = require('./embeds&buttons/checkin')
const playersMsgComponents = require('./embeds&buttons/playersSelection')
const MapMsgComponents = require('./embeds&buttons/mapSelection')

const {MessageButton, MessageActionRow} = require('discord.js')
class QueueManager {
    constructor(opts) {
        this.client = opts.client
        this.queueSize = 1
        this.queue = new Collection()
    }

    addToQueue(interaction) {
        if (this.queue.has(interaction.user.id)) throw new Error('user already queued')
        this.queue.set(interaction.user.id, interaction)
        this.processQueue().then()
    }

    isQueued(userId) {
        this.queue.sweep((interaction) => Date.now() - interaction.createdTimestamp > 900000) // Remove interactions older than 15 minutes because we can't update them
        console.log(userId)
        return this.queue.has(userId)
    }

    async processQueue() {
        this.queue.sweep((interaction) => Date.now() - interaction.createdTimestamp > 900000) // Remove interactions older than 15 minutes because we can't update them
        if (this.queue.size >= this.queueSize) {
            this.queueCopy = this.queue.clone()
            this.queue = new Collection()
            await Promise.all(this.queueCopy.map(async (interaction) => {
                // createChannels(interaction);
                const channel = interaction.guild.channels ; 
                const category = await channel.create('Valorant', {  type:'GUILD_CATEGORY' })
                const categoryId = category.id ; 
                const chatChannel = await channel.create('Chat',{type:"GUILD_TEXT" })
                chatChannel.setParent(`${categoryId}`)
                const gameSettings = await channel.create('Game Settings',{type:'GUILD_TEXT'})
                const gameSettingsId = await gameSettings.id ; 
                const gamesettingsInvite  = await gameSettings.createInvite({maxAge:Infinity , maxUses:Infinity}) ; 
                const  gamesettingsInviteLink = await gamesettingsInvite.url;
                //  console.log(gamesettingsInviteLink)
                gameSettings.setParent(`${categoryId}`)
                const checkIn = await channel.create('Check-In',{type:'GUILD_VOICE', userLimit:1})
                checkIn.setParent(`${categoryId}`)
                const checkinInvite = await checkIn.createInvite({maxAge:Infinity, maxUses:Infinity});
                const checkinInviteUrl = await checkinInvite.url;
  
             
// defining button here dure to invite link retreival restrictions : 
                const joingameButton = new MessageButton().setLabel('Join-Game').setStyle('LINK').setURL(`${gamesettingsInviteLink}`)
                const joingameRow = new MessageActionRow().addComponents(joingameButton)
                const checkinButton = new MessageButton().setStyle('LINK').setLabel('Check-In').setURL(`${checkinInviteUrl}`)
                const checkinRow = new MessageActionRow().addComponents(checkinButton)
                await interaction.editReply({embeds:[joinMsgComponents.joingameembed], components:[joingameRow]});
                
// Sending further messages to the game settings channel :
                const gamesettingsChannel = interaction.guild.channels.cache.get(`${gameSettingsId}`)
                console.log(gamesettingsChannel);
                
// sending checkin msg to check in channel :-
              await gamesettingsChannel.send({embeds:[checkinMsgComponents.checkinEmbed], components:[checkinRow]})
               console.log(checkIn.full);
            //    let run = 0 ;
            //    for (let i=0 ; i<Infinity ; i++) {
            //         if(checkIn.full === true){
            //         console.log(checkIn.full);
            //         gamesettingsChannel.send('Okk Channel full')
            //         return;
            //        }else{
            //            run = i ; 
            //        }
                   
                // }
               
            }))
        }
    }
}

module.exports = QueueManager
