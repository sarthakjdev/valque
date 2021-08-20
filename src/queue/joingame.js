const Discord = require("discord.js");
const {
  MessageActionRow,
  MessageButton,
  MessageComponentInteraction,
} = require("discord.js");

const users = require('../commands/setup.js')

const thumbnail = process.env.Thumbnail ; 


const joingameBtn =   new MessageButton()
.setLabel("JOIN GAME")
.setStyle("LINK")
.setURL('https://github.com');

const joingameInteractionBtn = new MessageActionRow().addComponents(
joingameBtn
);

const joingameEmbed = new Discord.MessageEmbed()
  .setTitle("QUEUED")
  .setAuthor("Que", `${thumbnail}`)
  .setColor("#ffffff")
  .setDescription(`QUEUE HAS BEEN CREATED . CLICK ON THE BUTTON BELOW TO JOIN THE GAME .`)
  .setThumbnail(`${thumbnail}`);;

module.exports = { joingameInteractionBtn, joingameEmbed };