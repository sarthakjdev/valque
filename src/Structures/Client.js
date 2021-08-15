const Discord = require('discord.js');

const intents = new Discord.Intents(32767);

const fs = require("fs");

const Command = require('./command.js');

const Event = require('./Event.js')
 
const dotEnv = require("dotenv");
dotEnv.config({ path: ".env" });

class Client extends Discord.Client {
constructor(){
    super({ intents });
    /**
     * @type {Discord.Collection<string , Command>}
     */
    this.commands = new Discord.Collection();

    this.prefix = process.env.Prefix ; 
}

start(token){
// setting up command handler:-
fs.readdirSync("./src/commands")
  .filter((file) => file.endsWith(".js"))
  .forEach((file) => {
    /**
     * @type {Command}
     */
    const command = require(`../commands/${file}`);
    console.log(`Command ${command.name} loaded`);
    this.commands.set(command.name, command);
  });


//setting up event handler :-

  fs.readdirSync("./src/Events")
  .filter((file) => file.endsWith(".js"))
  .forEach((file) => {
  /**
     * @type {Event}
     */
    const event = require(`../Events/${file}`);
    console.log(`Event ${event.event} loaded`);
    this.on(event.event , event.run.bind(null , this));
  });

  this.login(token);
}
}

module.exports = Client ; 