"use strict";

const Client = require("./src/Structures/Client.js");

const client = new Client();

const dotEnv = require("dotenv");
dotEnv.config({ path: ".env" });

client.start(process.env.TOKEN);


