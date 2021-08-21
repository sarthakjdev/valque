const Discord = require("discord.js");
const {
  MessageActionRow,
  MessageButton,
  MessageComponentInteraction,
} = require("discord.js");
const thumbnail = process.env.Thumbnail;

const selectMapEmbed = new Discord.MessageEmbed()
.setTitle("Select Map")
.setAuthor("Que", `${thumbnail}`)
.setColor("#ffffff")
.setDescription(``)
.setThumbnail(`${thumbnail}`)
.addField('Players', 'TEST' )
.addField('Map_A' , 'test' , true)
.addField('Map_A' , 'test' , true);

const sendmsg = (channel , text , duration = -1)=>{
  channel.send(text).then(messsage=>{
if (duration === -1 ){
  return ;
} 
setTimeout(() => {
  message.delete();
}, 1000* duration);
  })
}

module.exports = { selectMapEmbed ,  sendmsg };
 

