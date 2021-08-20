const Discord = require("discord.js");
const {
  MessageActionRow,
  MessageButton,
  MessageComponentInteraction,
} = require("discord.js");
const thumbnail = process.env.Thumbnail;
const queueBtn = new MessageButton()
  .setCustomId("queue")
  .setLabel("QUEUE")
  .setStyle("SUCCESS");
const cancelBtn = new MessageButton()
  .setCustomId("cancel")
  .setLabel("CANCEL")
  .setStyle("DANGER")
  .setDisabled(true);
const cancelBtnUpdated = new MessageButton()
  .setCustomId("cancel")
  .setLabel("CANCEL")
  .setStyle("DANGER")
  .setDisabled(false);
const queueButtonsRow = new MessageActionRow().addComponents(
  queueBtn,
  cancelBtn
);

const UpdatedButtonRow = new MessageActionRow().addComponents(
  queueBtn,
  cancelBtnUpdated
);

const queueEmbed = new Discord.MessageEmbed()
  .setTitle("Click on the queue button to start a queue search.")
  .setAuthor("Que", `${thumbnail}`)
  .setColor("#ffffff")
  .setDescription("Initiate searching for a queue by clicking on queue button below. It will take a few minutes and as soon as 10 players will be in a queue , click the updated button and do the further proceeding later on  ")
  .setThumbnail(`${thumbnail}`);


const updatesQueueEmbed = new Discord.MessageEmbed()
.setTitle("DON'T PRESS CANCEL, IT WILL CANCEL MATCH-MAKING.")
.setAuthor("Que", `${thumbnail}`)
.setColor("#ffffff")
.setDescription("`Please WAit!! Searching for enough players to join.`")
.setThumbnail(`${thumbnail}`);

module.exports = {
  queueButtonsRow,
  queueEmbed,
  UpdatedButtonRow,
  updatesQueueEmbed
};
