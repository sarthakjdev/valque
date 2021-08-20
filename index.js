"use strict";

const Client = require("./src/Structures/Client.js");

const client = new Client();

const dotEnv = require("dotenv");
dotEnv.config({ path: ".env" });

client.start(process.env.TOKEN);

const guild = client.guilds.cache.get(process.env.GuildId) ; 
function createChannel (channelId) {
  const channel = guild.channels.cache.get(`${channelId}`)
    return channel ; 
}
module.exports = {guild , createChannel , client} ; 


