const Discord = require('discord.js');
const Client = require('./Client.js')
/**
 * @param {Discord.Message | Discord.CommandInteraction} message 
 * @param {string[]} args 
 * @param {Client} client 
 */
function Runfunction(message , args , client){};

class Command {
    /**
     * @typedef {"BOTH" | "SLASH" | "TEXT"} CommandType
     * @typedef {{name:string , description: string ,permission: Discord.PermissionString, type: CommandType, slashCommandOptions: Discord.ApplicationCommandOption[], run: Runfunction}} CommandOptions 
     * @param {CommandOptions} options
     */
    constructor(options){
        this.name = options.name ; 
        this.description = options.description ; 
        this.permission = options.permission;
        this.type = ["BOTH" , "SLASH" , "TEXT"].includes(options.type) ? options.type : "TEXT";
        this.slashCommandOptions = options.slashCommandOptions || [];
        this.run = options.run ; 
    }
}
module.exports = Command ; 