const Discord = require('discord.js');
const config = require("../config.json");

module.exports = {
    name: 'skip',
    description: "Skip to the next song in queue.",
    aliases: ['s'],
    inVoiceChannel: true,
    execute(bot, message, args){
        if (!bot.distube.getQueue(message)) return bot.SendEmbed(message.channel, 'Error', 'There is no song playing right now.');
        if (!bot.distube.getQueue(message).songs[1]) return bot.SendEmbed(message.channel, 'Error', 'There is no song after this.');
		bot.distube.skip(message)
		message.react('👌')
    },
};