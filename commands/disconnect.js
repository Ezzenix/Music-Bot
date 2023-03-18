const Discord = require('discord.js');
const config = require("../config.json");

module.exports = {
    name: 'disconnect',
    description: "Stop playing songs.",
    aliases: ['stop', 'd'],
    inVoiceChannel: true,
    execute(bot, message, args){
        if (!bot.distube.getQueue(message)) return bot.SendEmbed(message.channel, 'Error', 'There is no song playing right now.');
		bot.distube.stop(message);
        message.react('👌');
    },
};