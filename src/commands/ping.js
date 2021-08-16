
const Command = require('../Structures/command.js');

const Discord = require('discord.js');

module.exports = new Command({
    name :'ping',
    description:'Shows ping of the bot',
    type:"BOTH",
    slashCommandOptions:[],
    permission: "SEND_MESSAGES" , 
    async run(message , args , client){
       const m = await message.reply(`Ping: ${client.ws.ping} ms`);
    //    message.reply(`Ping: ${client.ws.ping} ms`);
       const msg = message instanceof Discord.CommandInteraction ? await message.fetchReply() : m;
       msg.edit(
        `Ping: ${client.ws.ping} ms. \nMessage Ping: ${
            msg.createdTimestamp - message.createdTimestamp 
        }`
       ) 
    }
});