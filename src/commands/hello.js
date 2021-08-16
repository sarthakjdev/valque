
const { Interaction } = require('discord.js');
const interactionCreate = require('../Events/interactionCreate.js');
const Command = require('../Structures/command.js');

module.exports = new Command( {
    name :'hello',
    description:'replies with hii ',
    type:"BOTH",
    slashCommandOptions:[],
    permission:"SEND_MESSAGES",
    async run(message , args , client){
        message.reply(`Hii`)

        
    }
});