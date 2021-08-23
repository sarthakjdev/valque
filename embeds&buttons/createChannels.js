const { Guild } = require("discord.js");

let gamesettingsInviteLink = '';
let checkinInviteUrl='';
let createChannels = async (interaction)=> {
    const channel = interaction.guild.channels ; 
    const category = await channel.create('Valorant', {  type:'GUILD_CATEGORY' })
    const categoryId = category.id ; 
    const chatChannel = await channel.create('Chat',{type:"GUILD_TEXT" })
    chatChannel.setParent(`${categoryId}`)
    const gameSettings = await channel.create('Game Settings',{type:'GUILD_TEXT'})
    const gamesettingsInvite  = await gameSettings.createInvite({maxAge:Infinity , maxUses:Infinity}) ; 
     gamesettingsInviteLink = gamesettingsInvite.url;
     console.log(gamesettingsInviteLink)
    gameSettings.setParent(`${categoryId}`)
    const checkIn = await channel.create('Check-In',{type:'GUILD_VOICE'})
    checkIn.setParent(`${categoryId}`)
    const checkinInvite = await checkIn.createInvite({maxAge:Infinity, maxUses:Infinity});
     checkinInviteUrl = checkinInvite.url;

}


module.exports = { createChannels, gamesettingsInviteLink, checkinInviteUrl } ; 