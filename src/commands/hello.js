
const Command = require('../Structures/command');

module.exports = new Command( {
    name :'hello',
    description:'replies with hii ',
    async run(message , args , client){
        message.reply(`Hii`)
    }
});