
const Event = require('../Structures/Event.js');
const MessageComponentInteraction = require('discord.js');

module.exports = new Event("intearactionCreate", (client, interaction)=>{
    if (interaction.user.bot || !interaction.isCommand() || !interaction.guild || !interaction.isButton())
    return ; 

    const args = [
        interaction.commandName , 
        ...client.commands 
        .find(cmd=> cmd.name.toLowerCase() == interaction.commandName)
        .slashCommandOptions.map(v=>`${interaction.options.get(v.name).value}`)
    ];

    const command = client.commands.find(cmd => cmd.name.toLowerCase() == interaction.commandName);

    if (!command) return interaction.reply("That is not a valid command");
    const permission = interaction.member.permissions.has(command.permission);
    if(!permission)
     return interaction.reply(
         "You do not have correct permissions to run this command!"
     );

      command.run(interaction , args, client);

    //  if(interaction.isButton()){
    //     console.log(`Queue Initiated by${interaction.user.tag}`)
    //     interaction.reply({content : 'Thansk for clicking.'})
    // }
     
    });