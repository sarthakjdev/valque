const Command = require("../Structures/command.js");
const Discord = require("discord.js");
const Client = require("../Structures/Client.js");
const {
  MessageActionRow,
  MessageButton,
  MessageComponentInteraction,
} = require("discord.js");
const queueInteractionMsg = require("../queue/queue.js");
const startInteractionMsg = require("../queue/start.js");
const joingameInteractionMsg = require("../queue/joingame.js");
const players = require("../queue/players.js");
const client = require('../../index')
module.exports = new Command({
  name: "setup",
  description: "For admin to initiate",
  type: "BOTH",
  slashCommandOptions: [],
  async run(interaction, args, client) {
    interaction.reply({
      embeds: [startInteractionMsg.setupEmbed],
      components: [startInteractionMsg.setupButtonRow],
    });

    // Interaction colector collecting buttons clicks :-

    const filter = (i) => interaction.isButton();
    const collector = interaction.channel.createMessageComponentCollector({
      max:Infinity 
    });
    collector.on("collect", async (i) => {
      
      // Valoran id registration verification condition will go here :-

      if (i.customId === "start") {
        // console.log(i.member.guild.presences);
        i.reply({
          embeds: [queueInteractionMsg.queueEmbed],
          components: [queueInteractionMsg.queueButtonsRow],
          ephemeral: true
        });
      }

     let userid = '';
     let userInteracted = '';
      let gameSettingsChannelid = '';
      let vcInviteUrl ='';
      if (i.customId === "queue") {
         userid = i.user.id;
         userInteracted = `<@${userid}>`;
        const multipleInteraction = i;

        // pushing user-id intearcted with queue button in the array :-
        if (!players.grouped.includes(`${userInteracted}`)) {
          players.grouped.push(`${userInteracted}`);
        }

        // pushing every intearction with queue in an array :-

        if (!players.mutliInteractionArray.includes(`${multipleInteraction}`)) {
          players.mutliInteractionArray.push(`${multipleInteraction}`);
        }

        console.log(players.mutliInteractionArray.toString());

        
          // creating category and then initial channel for team selection and vc :-
        
          let categoryId = "";
          i.guild.channels
            .create("Valo-Zone", {
              type: "GUILD_CATEGORY",
            })
            .then((channel) => {
              categoryId = channel.id;
            });
          i.guild.channels
            .create("Game-Settings", {
              type: "GUILD_TEXT",
            })
            .then((channel) => {
              gameSettingsChannelid = channel.id;
              channel.setParent(`${categoryId}`);
            });
          i.guild.channels
            .create("Check-in", {
              type: "GUILD_VOICE",
            })
            .then((channel) => {
              channel.setParent(`${categoryId}`);
              vcInvite = channel.createInvite();
            });
            let vcInvite = '';
          i.guild.channels
            .create("Chat", {
              type: "GUILD_TEXT"
            })
            .then((channel) => {
              channel.setParent(`${categoryId}`);
               channel.createInvite({
                maxAge: Infinity,
                maxUses: Infinity
              }).then(  invite=>{
                   vcInvite = invite.url ; 
                 console.log(` vc invite : ${vcInvite}`);
              })
             vcInviteUrl = vcInvite ; 
             console.log(` vc invite url : ${vcInviteUrl}`) 
            });

            console.log( ` outer one url : ${vcInviteUrl}`)
             console.log(`outer one ${vcInvite}`)

          const joingameBtn = new MessageButton()
            .setLabel("JOIN GAME")
            .setStyle("LINK")
            .setURL(`https://github.com`);

          const joingameInteractionBtn = new MessageActionRow().addComponents(
            joingameBtn
          );
          i.update({
            content: `${players.grouped.toString()}`,
            embeds: [joingameInteractionMsg.joingameEmbed],
            components: [joingameInteractionBtn],
          });
        
      }

      if (i.customId === "cancel") {
        i.update({ components: [queueInteractionMsg.queueButtonsRow] });
      }
    
    });

   

    collector.on("end", (interaction) => {
      interaction
    });
  },
});
