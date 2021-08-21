// command class :-
const Command = require("../Structures/command.js");

const Discord = require("discord.js");
const Client = require("../Structures/Client.js");
const client = new Client();
const {
  MessageActionRow,
  MessageButton,
  MessageComponentInteraction,
} = require("discord.js");

// Importing embeds and butttons :-
const queueInteractionMsg = require("../queue/queue.js");
const startInteractionMsg = require("../queue/start.js");
const joingameInteractionMsg = require("../queue/joingame.js");
const players = require("../queue/players.js");

// Importing client:-
// const client = require('../../index')
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

    // const filter = (i) => interaction.isButton();
    const collector = interaction.channel.createMessageComponentCollector({
      max: Infinity,
    });
    await collector.on("collect", async (i) => {
      // Valoran id registration verification condition will go here :-

      if (i.customId === "start") {
        // console.log(i.member.guild.presences);
        i.reply({
          embeds: [queueInteractionMsg.queueEmbed],
          components: [queueInteractionMsg.queueButtonsRow],
          ephemeral: true,
        });
      }

      if (i.customId === "cancel") {
        i.update({ components: [queueInteractionMsg.queueButtonsRow] });
      }
    });
    collector.on("end", (interaction) => {});

    const filter = (interaction) => interaction.customId === "queue";
    // console.log(filter)
    const queuecollector = interaction.channel.createMessageComponentCollector({
      filter,
      max: 2,
    });
    console.log("if statement reached");

    console.log("if statement reached and trigerred");
    await queuecollector.on("collect", async (i) => {});

    queuecollector.on("end", async (interaction) => {
      interaction.map(async (i) => {
        let userid = "";
        let userInteracted = "";
        let gameSettingsChannelid = "";
        let vcInviteUrl = "";
        if (i.customId === "queue") {
          let userIdArray = [];
          userid = i.user.id;
          userInteracted = `<@${userid}>`;
          const multipleInteraction = i;

          // pushing user-id intearcted with queue button in the array :-
          const pushingArray = () => {
            if (!players.grouped.includes(`${userInteracted}`)) {
              players.grouped.push(`${userInteracted}`);
            }
            if (!userIdArray.includes(`${userid}`)) {
              userIdArray.push(`${userid}`);
            }
          };

          await pushingArray();

          // pushing every intearction with queue in an array :-

          if (
            !players.mutliInteractionArray.includes(`${multipleInteraction}`)
          ) {
            players.mutliInteractionArray.push(`${multipleInteraction}`);
          }

          console.log(players.mutliInteractionArray.toString());

          // creating category and then initial channel for team selection and vc :-
          let vcInvite = '';
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
            const channel = await i.guild.channels.create("Chat", {
              type: "GUILD_TEXT",
            });
            channel.setParent(`${categoryId}`);
            const invite = await channel.createInvite({
              maxAge: Infinity,
              maxUses: Infinity,
            });
            console.log(invite)
             vcInvite = invite.url ;
         
         
          console.log(`returned invite link ${vcInvite}`);

          console.log(` outer one url : ${vcInviteUrl}`);
          console.log(`outer one ${vcInvite}`);

          const joingameBtn = new MessageButton()
            .setLabel("JOIN GAME")
            .setStyle("LINK")
            .setURL(`${vcInvite}`);

          const joingameInteractionBtn = new MessageActionRow().addComponents(
            joingameBtn
          );

          i.update({
            content: `${players.grouped.toString()}`,
            embeds: [joingameInteractionMsg.joingameEmbed],
            components: [joingameInteractionBtn],
          });

          //  if(userIdArray.length === 2 ){
          //    console.log('if statement triggered')
          // players.grouped.toString().send({
          //   content: `${players.grouped.toString()}`,
          //   embeds: [joingameInteractionMsg.joingameEmbed],
          //   components: [joingameInteractionBtn],
          // })
          // for(let index = 0 ; index < userIdArray ; index++){
          // console.log(players.grouped[0])
          // client.user.fetch(`${players.grouped[index]}`).then(user=>{
          //   user.send({
          //     content: `${players.grouped.toString()}`,
          //     embeds: [joingameInteractionMsg.joingameEmbed],
          //     components: [joingameInteractionBtn],
          //   })
          // })

          //   client.user.fetch(`${userIdArray[index]}`).then(user=>{
          //     user.send({
          //           content: `${players.grouped.toString()}`,
          //           embeds: [joingameInteractionMsg.joingameEmbed],
          //           components: [joingameInteractionBtn],
          //         })
          //   })
          // }

          //  }
        }
      });
    });
  },
});
