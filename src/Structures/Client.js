const Discord = require("discord.js");

const intents = new Discord.Intents(32767);

const fs = require("fs");

const Command = require("./command.js");

const Event = require("./Event.js");

const dotEnv = require("dotenv");
dotEnv.config({ path: ".env" });

class Client extends Discord.Client {
  constructor() {
    super({ intents });
    /**
     * @type {Discord.Collection<string , Command>}
     */
    this.commands = new Discord.Collection();

    this.prefix = process.env.Prefix;
  }

  start(token) {
    // setting up command handler:-
    const commandFiles = fs
      .readdirSync("./src/commands")
      .filter((file) => file.endsWith(".js"));
      
      /**
       * @type {Command[]}
       */
    const commands = commandFiles.map(file=> require(`../commands/${file}`)) 

    commands.forEach(cmd=> {
      console.log(`Command ${cmd.name} was loaded `)
      this.commands.set(cmd.name , cmd)
    });


    const slashCommands  = commands
    .filter(cmd=>["BOTH", "SLASH"].includes(cmd.type))
    .map(cmd=>({
      name: cmd.name.toLowerCase(),
      description: cmd.description , 
      permission: [],
      options: cmd.slashCommandOptions , 
      defaultPermission:true 
    }));
    // .forEach((file) => {
    //   /**
    //    * @type {Command}
    //    */
    //   const command = require(`../commands/${file}`);
    //   console.log(`Command ${command.name} loaded`);
    //   this.commands.set(command.name, command);
    // });

    //setting up event handler :-

this.removeAllListeners();

this.on('ready', async()=>{
  const cmds = await this.application.commands.set(slashCommands);

  cmds.forEach(cmd => console.log(`Slash command ${cmd.name} registered`));
  
})

    fs.readdirSync("./src/Events")
      .filter((file) => file.endsWith(".js"))
      .forEach((file) => {
        /**
         * @type {Event}
         */
        const event = require(`../Events/${file}`);
        console.log(`Event ${event.event} loaded`);
        // this.on(event.event, event.run);
        this.on(event.event, event.run.bind(null, this));
      });

    this.login(token);
  }
}

module.exports = Client;
