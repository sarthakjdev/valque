'use strict';
// importing discordjs library in the app :-
const Discord = require('discord.js');
const intents = new Discord.Intents(32767);
const Collection = require('discord.js');

// path module :-
const path = require('path');

// for setting up environment variable :-
const dotEnv = require('dotenv');
dotEnv.config();
 
// Initialising the bot :-
const client = new Discord.Client({intents});

client.on('ready' , ()=>{
    console.log("Bot is ready !!")
});

client.on('messageCreate' , message=>{
   if (message.content == "ping"){
       message.reply("pong")
   }
})



// loging in  to the bot :- 
client.login(process.env.TOKEN);
