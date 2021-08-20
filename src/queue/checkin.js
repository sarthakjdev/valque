const Discord = require("discord.js");
const {
  MessageActionRow,
  MessageButton,
  MessageComponentInteraction,
} = require("discord.js");
const thumbnail = process.env.Thumbnail;

const checkinEmbed = new Discord.MessageEmbed()
.setTitle("CHECK-IN")
.setAuthor("Que", `${thumbnail}`)
.setColor("#ffffff")
.setDescription(`Check-In to select the team and map . `)
.setThumbnail(`${thumbnail}`);

const checkinBtn =  new MessageButton()
.setLabel("CHECK IN")
.setStyle("LINK")
.setURL('https://github.com'),

const checkinMsgRow = new MessageActionRow().addComponents(
    checkinBtn
  ); 