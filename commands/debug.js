const Discord = require('discord.js');
const config = require("../config.json");

module.exports = {
    name: 'debug',
    description: "Debug command.",
    aliases: [],
    execute(bot, message, args){
		console.log(bot.distube.getQueue(message));
    },
};