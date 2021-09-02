const { Collection, ButtonInteraction, MessageButton, MessageActionRow , MessageEmbed, Permissions } = require('discord.js')

const pWaitFor = require('./util/pwaitfor');

// Importing buttons and embeds : 
const joinMsgComponents = require('./embeds&buttons/joingame')
// const checkinMsgComponents = require('./embeds&buttons/checkin')
const playersMsgComponents = require('./embeds&buttons/playersSelection')
const MapMsgComponents = require('./embeds&buttons/mapSelection')

const { indexOf } = require('lodash');
const pwaitfor = require('./util/pwaitfor');

const guild = process.env.HOME_GUILD_ID ; 

class QueueManager {
    constructor(opts) {
        this.client = opts.client
        this.queueSize = 6
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

   tagsForBtns (arrayOfId , client) {
        let arrayOfPlayerTags = [] ; 
        for (let index = 0; index < arrayOfId.length; index++) {
            const element =   client.users.cache.get(`${arrayOfId[index]}`)
            arrayOfPlayerTags.push(element.tag)
        }
        return arrayOfPlayerTags ; 
    }

    createTags(arrayOfId , client){
        let arrayOfPlayerTags = [] ; 
        for (let index = 0; index < arrayOfId.length; index++) {
            const element =   (`<@${arrayOfId[index]}>`)
            arrayOfPlayerTags.push(element)
        }
        return arrayOfPlayerTags; 
    }

   async reactionSelection(Availbleplayers , buttonInteraction){
     
        if(Availbleplayers.inlcudes(`${buttonInteraction.user.id}`)){
             remainingPlayesr = await  Availbleplayers.filter((element)=>{element != buttonInteraction.user.id})
        }
    }

    async processQueue(interaction) {
          this.queue.sweep((interaction) => Date.now() - interaction.createdTimestamp > 900000) // Remove interactions older than 15 minutes because we can't update them
         if ( this.queue.size >= this.queueSize ) {
             this.queueCopy = this.queue.clone()
             this.queue = new Collection()

              // setting up arrays for team players:-
              const arrayOfQueue = this.queueCopy.map(ButtonInteraction=> ButtonInteraction.user.id);
              const tags = await this.createTags(arrayOfQueue, this.client);
              const tagsForBtns = await this.tagsForBtns(arrayOfQueue, this.client);
              console.log(tags.toString())
              const captains = [arrayOfQueue[0], arrayOfQueue[1]];
              const remainingplayers = [ `${tags[2]}`,`${tags[3]}`, `${tags[4]}`,`${tags[5]}`,`${tags[6]}`,`${tags[7]}`,`${tags[8]}`,`${tags[9]}` ];

              const channel = interaction.guild.channels ; 
            // removing permission from everyone :-
             const category = await channel.create('Valorant', {  type:'GUILD_CATEGORY'})
             await category.permissionOverwrites.create(channel.guild.roles.everyone, { SEND_MESSAGES: false, CONNECT:false  });
             
             await category.permissionOverwrites.create(arrayOfQueue[0], { SEND_MESSAGES: true, CONNECT:true , ADD_REACTIONS:false });
             await category.permissionOverwrites.create(arrayOfQueue[1], { SEND_MESSAGES: true, CONNECT:true , ADD_REACTIONS:false });
             await category.permissionOverwrites.create(arrayOfQueue[2], { SEND_MESSAGES: true, CONNECT:true , ADD_REACTIONS:false });
             await category.permissionOverwrites.create(arrayOfQueue[3], { SEND_MESSAGES: true, CONNECT:true , ADD_REACTIONS:false });
             await category.permissionOverwrites.create(arrayOfQueue[4], { SEND_MESSAGES: true, CONNECT:true , ADD_REACTIONS:false });
            //  await category.permissionOverwrites.create(arrayOfQueue[5], { SEND_MESSAGES: true, CONNECT:true, ADD_REACTIONS:false });
            //  await category.permissionOverwrites.create(arrayOfQueue[6], { SEND_MESSAGES: true, CONNECT:true, ADD_REACTIONS:false });
            //  await category.permissionOverwrites.create(arrayOfQueue[7], { SEND_MESSAGES: true, CONNECT:true, ADD_REACTIONS:false });
            //  await category.permissionOverwrites.create(arrayOfQueue[8], { SEND_MESSAGES: true, CONNECT:true, ADD_REACTIONS:false });
            //  await category.permissionOverwrites.create(arrayOfQueue[9], { SEND_MESSAGES: true, CONNECT:true, ADD_REACTIONS:false });
            
             const categoryId = category.id ; 
             const chatChannel = await channel.create('Chat',{type:"GUILD_TEXT" })

             chatChannel.setParent(`${categoryId}`)
             const gameSettings = await channel.create('Game Settings',{type:'GUILD_TEXT'})
             await gameSettings.permissionOverwrites.create(arrayOfQueue[0], { SEND_MESSAGES: false  });
             await gameSettings.permissionOverwrites.create(arrayOfQueue[1], { SEND_MESSAGES: false  });
             await gameSettings.permissionOverwrites.create(arrayOfQueue[2], { SEND_MESSAGES: false  });
             await gameSettings.permissionOverwrites.create(arrayOfQueue[3], { SEND_MESSAGES: false  });
             await gameSettings.permissionOverwrites.create(arrayOfQueue[4], { SEND_MESSAGES: false  });
            //  await gameSettings.permissionOverwrites.create(arrayOfQueue[5], { SEND_MESSAGES: false  });
            //  await gameSettings.permissionOverwrites.create(arrayOfQueue[6], { SEND_MESSAGES: false  });
            //  await gameSettings.permissionOverwrites.create(arrayOfQueue[7], { SEND_MESSAGES: false  });
            //  await gameSettings.permissionOverwrites.create(arrayOfQueue[8], { SEND_MESSAGES: false  });
            //  await gameSettings.permissionOverwrites.create(arrayOfQueue[9], { SEND_MESSAGES: false  });
             const gameSettingsId = await gameSettings.id ; 
             gameSettings.setParent(`${categoryId}`)
             const gamesettingsInvite  = await gameSettings.createInvite({maxAge:Infinity , maxUses:Infinity}) ; 
             const  gamesettingsInviteLink = await gamesettingsInvite.url;
             const checkIn = await channel.create('Check-In',{type:'GUILD_VOICE', userLimit:this.queueSize})
             checkIn.setParent(`${categoryId}`)
             const checkinInvite = await checkIn.createInvite({maxAge:Infinity, maxUses:Infinity});
             const checkinInviteUrl = await checkinInvite.url;
             
             // defining button here dure to invite link retreival restrictions : 
             const thumbnail = process.env.Thumbnail
             const joingameButton = new MessageButton().setLabel('Join-Game').setStyle('LINK').setURL(`${gamesettingsInviteLink}`)
             const joingameRow = new MessageActionRow().addComponents(joingameButton)
             const checkinEmbed = new MessageEmbed().setAuthor('Que Bot', `${thumbnail}`).setColor('WHITE')
             const checkinButton = new MessageButton().setStyle('LINK').setLabel('Check-In').setURL(`${checkinInviteUrl}`)
             const checkinRow = new MessageActionRow().addComponents(checkinButton)

             // Sending join messages to the game settings channel :
 
                  await Promise.all(this.queueCopy.map(async (interaction) => {
                    await interaction.editReply({embeds:[joinMsgComponents.joingameembed], components:[joingameRow]});
                  }))

                const gamesettingsChannel = interaction.guild.channels.cache.get(`${gameSettingsId}`)
                await gamesettingsChannel.send({content:` ${tags.toString()}  \n Check-in to continue the process.` , embeds:[checkinEmbed], components:[checkinRow]})    
                // Waitinng for the checkin channel to be full :-
                await pWaitFor(()=>checkIn.full);

                const player1 = new MessageButton().setCustomId(`${arrayOfQueue[2]}`).setLabel(`${tagsForBtns[2]}`).setStyle('SECONDARY')
                const player2 = new MessageButton().setCustomId(`${arrayOfQueue[3]}`).setLabel(`${tagsForBtns[3]}`).setStyle('SECONDARY')
                const player3 = new MessageButton().setCustomId(`${arrayOfQueue[4]}`).setLabel(`${tagsForBtns[4]}`).setStyle('SECONDARY')
                // const player4 = new MessageButton().setCustomId(`${arrayOfQueue[5]}`).setLabel(`${tagsForBtns[5]}`).setStyle('SECONDARY')
                // const player5 = new MessageButton().setCustomId(`${arrayOfQueue[6]}`).setLabel(`${tagsForBtns[6]}`).setStyle('SECONDARY')
                // const player6 = new MessageButton().setCustomId(`${arrayOfQueue[7]}`).setLabel(`${tagsForBtns[7]}`).setStyle('SECONDARY')
                // const player7 = new MessageButton().setCustomId(`${arrayOfQueue[8]}`).setLabel(`${tagsForBtns[8]}`).setStyle('SECONDARY')
                // const player8= new MessageButton().setCustomId(`${arrayOfQueue[9]}`).setLabel(`${tagsForBtns[9]}`).setStyle('SECONDARY')
    
    
                // team n queue msg :-
                let queuedPlayersEmbed = new MessageEmbed().setThumbnail(`${thumbnail}`).setAuthor('Que Bot', `${thumbnail}`).addFields( { name:'Players in queue ' , value:`   ${tags[0]} \n ${tags[1]} \n ${tags[2]} \n  ${tags[3]} \n  ${tags[4]}  \n ${tags[5]}  \n ${tags[6]}  \n ${tags[7]}  \n ${tags[8]} \n ${tags[9]}`});
                const  playersQueued = await gamesettingsChannel.send({embeds:[queuedPlayersEmbed]});

                //team selection process starts here :-
                let teamSelectionRow1 = new MessageActionRow().addComponents(player1, player2 ) //, player4)
                let teamSelectionRow2 = new MessageActionRow().addComponents(player3) //, player4) // player5)  , player6, player7, player8)
                let playerSelectionEmbed = new MessageEmbed().setThumbnail(`${thumbnail}`).setDescription(`Captains mentioned below, now select your players one by one. \n NOTE: No need to react sequentially, but just maintain the ethics and react only when its your turn \n Its your turn : ${tags[0]} `).setAuthor('Que Bot', `${thumbnail}`).setFields({name:' Team A', value:`${tags[0]} 🌟`, inline:true}, {name:' Team B', value:`${tags[1]} 🌟`, inline:true},{name: 'Available Players ✅', value:` ${remainingplayers.toString()}`})
                const teamSelectionMsg =   await gamesettingsChannel.send({embeds:[playerSelectionEmbed], components:[teamSelectionRow1, teamSelectionRow2]}) 

                const teamA = [`${tags[0]} 🌟`];
                const teamB = [`${tags[1]} 🌟`];

                const filterPlayerTeamA = (buttonInteraction) =>{if (buttonInteraction.user.id === captains[0] && (teamSelectionMsg.components[0].components.map(element=> element.customId === buttonInteraction.customId) || teamSelectionMsg.components[1].components.map(element=> element.customId === buttonInteraction.customId))) {return true }} ; 
                const teamACollector = teamSelectionMsg.channel.createMessageComponentCollector({   componentType: 'BUTTON', filter: filterPlayerTeamA,   max:4  })
                teamACollector.on('collect', async (BtnInteraction) => {
                       console.log(teamSelectionMsg.components[0].components.map(element=> element.customId === BtnInteraction.customId ))
                    if(teamSelectionMsg.components[0].components.map(element=> element.customId === BtnInteraction.customId )[0]) {
                        const btnClickedInMsg =  teamSelectionMsg.components[0].components.map(element=> element.customId === BtnInteraction.customId );
                        const indexOfBtnClicked = indexOf(btnClickedInMsg); 
                          // deleting that button :- 
                          let resultingArray = teamSelectionMsg.components[0].components.filter(player=> player.customId != BtnInteraction.customId)
                          teamSelectionMsg.components[0].components = resultingArray;
                          teamSelectionRow1 = new MessageActionRow().addComponents(resultingArray)
                    }
                    if(teamSelectionMsg.components[1].components.map(element=> element.customId === BtnInteraction.customId )[0]){
                        const btnClickedInMsg =  teamSelectionMsg.components[1].components.map(element=> element.customId === BtnInteraction.customId );
                        const indexOfBtnClicked = indexOf(btnClickedInMsg) ; 
                          // deleting that button :- 
                         let  resultingArray = teamSelectionMsg.components[1].components.filter(player=> player.customId != BtnInteraction.customId)
                         teamSelectionMsg.components[1].components = resultingArray  
                         teamSelectionRow2 = new MessageActionRow().addComponents(resultingArray)
                    }
                       let tagofPlayerSelected = `<@${BtnInteraction.customId}>`
                       if(teamB.includes(`${tagofPlayerSelected}`)){return ; }
                       if(!teamA.includes(`${tagofPlayerSelected}`)){
                           teamA.push(`${tagofPlayerSelected}`)
                           const indexOfPlayerSelected = remainingplayers.indexOf(tagofPlayerSelected)
                           remainingplayers.splice(indexOfPlayerSelected,1);
                            playerSelectionEmbed = new MessageEmbed().setThumbnail(`${thumbnail}`).setDescription(`Captains mentioned below, now select your players one by one. \n NOTE: No need to react sequentially, but just maintain the ethics and react only when its your turn. \n Its your turn : ${tags[1]}`).setAuthor('Que Bot', `${thumbnail}`).setFields(  {name:'Captains', value:`${tags[0]} 🌟 ${tags[1]} 🌟`},{name:' Team A', value:`${teamA.toString()}`, inline:true}, {name:' Team B', value:`${teamB.toString()}`, inline:true},{name: 'Available Players ✅', value:` ${remainingplayers.toString()}`})
                            if(teamSelectionMsg.components[0].components.length === 0  && !teamSelectionMsg.components[1].components.length === 0 ){
                                teamSelectionMsg.edit({embeds:[playerSelectionEmbed], components:[teamSelectionRow2]})
                                return; 
                            } 
                            if (teamSelectionMsg.components[1].components.length === 0 && !teamSelectionMsg.components[0].components.length === 0) {
                                teamSelectionMsg.edit({embeds:[playerSelectionEmbed], components:[teamSelectionRow1]})
                                return ; 
                            }
                            if(teamSelectionMsg.components[0].components.length === 0 && teamSelectionMsg.components[1].components.length === 0){
                                teamSelectionMsg.edit({embeds:[playerSelectionEmbed]})
                                return ; 
                            }
                            teamSelectionMsg.edit({embeds:[playerSelectionEmbed], components:[teamSelectionRow1, teamSelectionRow2]})
                       }
                })

                const filterPlayerTeamB = (buttonInteraction) =>{if(  buttonInteraction.user.id === captains[1] && (teamSelectionMsg.components[0].components.map(element=> element.customId === buttonInteraction.customId) || teamSelectionMsg.components[1].components.map(element=> element.customId === buttonInteraction.customId))) {return true }} ; 
                const teamBCollector = teamSelectionMsg.channel.createMessageComponentCollector({ componentType: 'BUTTON', filter: filterPlayerTeamB, max:4 })
                teamBCollector.on('collect', async (BtnInteraction) => {
                    if(teamSelectionMsg.components[0].components.map(element=> element.customId === BtnInteraction.customId )[0]) {
                        const btnClickedInMsg =  teamSelectionMsg.components[0].components.map(element=> element.customId === BtnInteraction.customId );
                        const indexOfBtnClicked = indexOf(btnClickedInMsg) ; 
                          // deleting that button :- 
                         let resultingArray = teamSelectionMsg.components[0].components.filter(player=>player.customId != BtnInteraction.customId)
                         teamSelectionMsg.components[0].components = resultingArray ;
                         teamSelectionRow1 = new MessageActionRow().addComponents(resultingArray)
                    }
                    if(teamSelectionMsg.components[1].components.map(element=> element.customId === BtnInteraction.customId )[0]){
                        const btnClickedInMsg =  teamSelectionMsg.components[1].components.map(element=> element.customId === BtnInteraction.customId );
                        const indexOfBtnClicked = indexOf(btnClickedInMsg) ; 
                          // deleting that button :- 
                        let resultingArray = teamSelectionMsg.components[1].components.filter(player=> player.customId != BtnInteraction.customId)
                        teamSelectionMsg.components[0].components = resultingArray ; 
                        teamSelectionRow2 = new MessageActionRow().addComponents(resultingArray)
                    }
                  
                    let tagofPlayerSelected = `<@${BtnInteraction.customId}>`
                    if(teamA.includes(`${tagofPlayerSelected}`)){return ; }
                    if(!teamB.includes(`${tagofPlayerSelected}`)){
                        teamB.push(`${tagofPlayerSelected}`)
                        const indexOfPlayerSelected = remainingplayers.indexOf(tagofPlayerSelected)
                        remainingplayers.splice(indexOfPlayerSelected,1);
                        playerSelectionEmbed = new MessageEmbed().setThumbnail(`${thumbnail}`).setDescription(`Captains mentioned below, now select your players one by one. \n NOTE: No need to react sequentially, but just maintain the ethics and react only when its your turn. \n Its your turn : ${tags[0]}`).setAuthor('Que Bot', `${thumbnail}`).setFields(  {name:'Captains', value:`${tags[0]} 🌟 ${tags[1]} 🌟`},{name:' Team A', value:`${teamA.toString()}`, inline:true}, {name:' Team B', value:`${teamB.toString()}`, inline:true},{name: 'Available Players ✅', value:` ${remainingplayers.toString()}`})
                        if(teamSelectionMsg.components[0].components.length === 0  && !teamSelectionMsg.components[1].components.length === 0 ){
                            teamSelectionMsg.edit({embeds:[playerSelectionEmbed], components:[teamSelectionRow2]})
                            return; 
                        } 
                        if (teamSelectionMsg.components[1].components.length === 0 && !teamSelectionMsg.components[0].components.length === 0) {
                            teamSelectionMsg.edit({embeds:[playerSelectionEmbed], components:[teamSelectionRow1]})
                            return; 
                        }
                        if(teamSelectionMsg.components[0].components.length === 0 && teamSelectionMsg.components[1].components.length === 0){
                            teamSelectionMsg.edit({embeds:[playerSelectionEmbed]})
                            return; 
                        }
                        }
                        teamSelectionMsg.edit({embeds:[playerSelectionEmbed], components:[teamSelectionRow1, teamSelectionRow2]})
                })

                const teamAVc = await channel.create('TEAM-A',{type:'GUILD_VOICE', userLimit:5})
                const teamAchannelID = teamAVc.id ; 
                teamAVc.setParent(categoryId)
                const teamBVc = await channel.create('TEAM-B',{type:'GUILD_VOICE', userLimit:5})
                const teamBchannelID = teamBVc.id ;
                teamBVc.setParent(categoryId)
                //    checkIn.delete()
                //    gamesettingsChannel.delete()
               
               // dragging members to their respective vc channel :-
            
                await pwaitfor(()=>remainingplayers.length === 0 )
        
              // Map selection process :-
                teamACollector.stop();
                teamBCollector.stop();
               const mapSelectionMsg = await  gamesettingsChannel.send({embeds:[MapMsgComponents.mapSelectionEmbed],components:[MapMsgComponents.mapActionRow, MapMsgComponents.mapActionRow2]} );
                const mapSelectionFilter = (buttonInteraction) => MapMsgComponents.availableMap.map(element=>element === buttonInteraction.customId)
                const mapSelectionCollector = mapSelectionMsg.channel.createMessageComponentCollector({ componentType: 'BUTTON', filter: mapSelectionFilter, max:6})
                mapSelectionCollector.on('collect', async (BtnInteraction) => {
                    if(BtnInteraction.user.id ===  `${captains[0]}` ){
                        console.log(`TEam A you have banned ${BtnInteraction.customId}`)
                    }
                     if (BtnInteraction.user.id ===  `${captains[1]}`){
                        console.log(`TEam B you have banned ${BtnInteraction.customId}`)
                    }
                })

          
            //   await teamA.forEach(element=>element.setChannel(teamAchannelID));
            //   await teamB.forEach(element=>element.setChannel(teamBchannelID));
               
            
         }
     }

 }
module.exports = QueueManager