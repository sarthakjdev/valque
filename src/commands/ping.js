const { Message } = require('discord.js');
const Command = require('../Structures/command');


module.exports = new Command( {
    name :'ping',
    description:'Shows ping of the bot',

    async run(message , args , client){

        message.reply(`Ping: ${client.ws.ping} ms`)
    }
});