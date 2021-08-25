const { Collection, ButtonInteraction } = require('discord.js')

// Importing buttons and embeds : 
const joinMsgComponents = require('./embeds&buttons/joingame')
// const checkinMsgComponents = require('./embeds&buttons/checkin')
const playersMsgComponents = require('./embeds&buttons/playersSelection')
const MapMsgComponents = require('./embeds&buttons/mapSelection')

const {MessageButton, MessageActionRow , MessageEmbed} = require('discord.js')

class QueueManager {
    constructor(opts) {
        this.client = opts.client
        this.queueSize = 2
        this.queue = new Collection()
    }

    addToQueue(interaction) {
        if (this.queue.has(interaction.user.id)) throw new Error('user already queued')
        this.queue.set(interaction.user.id, interaction)
        this.processQueue(interaction).then()
    }

    isQueued(userId) {
        this.queue.sweep((interaction) => Date.now() - interaction.createdTimestamp > 900000) // Remove interactions older than 15 minutes because we can't update them
        console.log(userId)
        return this.queue.has(userId)
    }

    createTags(arrayOfId) {
        let arrayOfPlayerTags = [] ; 
        for (let index = 0; index < arrayOfId.length; index++) {
            const element = `<@${arrayOfId[index]}>`
            arrayOfPlayerTags.push(element)
        }
        return arrayOfPlayerTags ; 
    }

    // reactionSelection(){

    // }

    async processQueue(interaction) {
        this.queue.sweep((interaction) => Date.now() - interaction.createdTimestamp > 900000) // Remove interactions older than 15 minutes because we can't update them
        if ( this.queue.size >= this.queueSize ) {
            this.queueCopy = this.queue.clone()
            this.queue = new Collection()

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
            const checkIn = await channel.create('Check-In',{type:'GUILD_VOICE', userLimit:this.queueSize})
            checkIn.setParent(`${categoryId}`)
            const checkinInvite = await checkIn.createInvite({maxAge:Infinity, maxUses:Infinity});
            const checkinInviteUrl = await checkinInvite.url;
            
            // setting up arrays for team players :-

            const arrayOfQueue = this.queueCopy.map(ButtonInteraction=> ButtonInteraction.user.id);
            for (let index = 0; index < arrayOfQueue.length; index++) {
            const element = arrayOfQueue[index];
            console.log(element) 
         } 
           const tags = await this.createTags(arrayOfQueue);
           const captains = [arrayOfQueue[0], arrayOfQueue[1]];
           const remainingplayers = [];
           for (let index = 2; index < tags.length; index++) {
                  remainingplayers.push(tags[index]) ;
           }
           
            // defining button here dure to invite link retreival restrictions : 
            const thumbnail = process.env.Thumbnail
            const joingameButton = new MessageButton().setLabel('Join-Game').setStyle('LINK').setURL(`${gamesettingsInviteLink}`)
            const joingameRow = new MessageActionRow().addComponents(joingameButton)
            const checkinEmbed = new MessageEmbed().setAuthor('Que Bot', `${thumbnail}`).setColor('WHITE').setDescription(` ${tags.toString()}  \n Check-in to continue the process.`)
            const checkinButton = new MessageButton().setStyle('LINK').setLabel('Check-In').setURL(`${checkinInviteUrl}`)
            const checkinRow = new MessageActionRow().addComponents(checkinButton)

             // Sending further messages to the game settings channel :
            const gamesettingsChannel = interaction.guild.channels.cache.get(`${gameSettingsId}`)
            await gamesettingsChannel.send({embeds:[checkinEmbed], components:[checkinRow]})    
            await Promise.all(this.queueCopy.map(async (interaction) => {
                await interaction.editReply({embeds:[joinMsgComponents.joingameembed], components:[joingameRow]});
            }))

                // defining btns and embeds for team msg :-
                const teamEmbed = new MessageEmbed().setAuthor('Que Bot', `${thumbnail}`).setFields({name:'Players in queue.', value:` ${tags[0]} \n ${tags[1]} \n ${tags[2]} \n ${tags[3]} \n ${tags[4]} \n ${tags[5]} \n ${tags[6]}  \n${tags[7]}  \n ${tags[8]} \n ${tags[9]}`})
                await gamesettingsChannel.send({embeds:[teamEmbed]});

                const playerSelectionEmbed = new MessageEmbed().setThumbnail(`${thumbnail}`).setDescription('Captains mentioned below, now select your players one by one. \n NOTE: No need to react sequentially, but just maintain the ethics and react only when its your turn').setAuthor('Que Bot', `${thumbnail}`).setFields({name:' Team A', value:`${tags[0]} 🌟`, inline:true}, {name:' Team B', value:`${tags[1]} 🌟`, inline:true},{name: 'Available Players', value:` 1️⃣ ${tags[2]} \n 2️⃣ ${tags[3]} \n 3️⃣ ${tags[4]} \n 4️⃣ ${tags[5]} \n 5️⃣ ${tags[6]} \n 6️⃣ ${tags[7]} \n 7️⃣ ${tags[8]}  \n 8️⃣ ${tags[9]}`})
                await gamesettingsChannel.send({embeds:[playerSelectionEmbed]}).then(embedMsg=>{embedMsg.react('1️⃣') , embedMsg.react('2️⃣'), embedMsg.react('3️⃣'), embedMsg.react('4️⃣'), embedMsg.react('5️⃣'), embedMsg.react('6️⃣'), embedMsg.react('7️⃣'), embedMsg.react('8️⃣')});
        }
    }
}
module.exports = QueueManager
