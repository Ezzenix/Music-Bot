const Discord = require('discord.js');
const config = require("../config.json");

module.exports = {
    name: 'pause',
    description: "Pause the current song.",
    aliases: [],
    inVoiceChannel: true,
    execute(bot, message, args){
        if (!bot.distube.getQueue(message)) return bot.SendEmbed(message.channel, 'Error', 'There is no song playing right now.');
		if (!bot.distube.getQueue(message).playing) return bot.SendEmbed(message.channel, 'Error', 'The song is already paused.');
		bot.distube.pause(message)
		message.react('👌')
    },
};