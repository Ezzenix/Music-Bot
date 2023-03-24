const { EmbedBuilder } = require('discord.js');
const config = require("../config.json");

module.exports = {
    name: 'resume',
    description: "Resume playing the current song.",
    aliases: ['r'],
    inVoiceChannel: true,
    execute(bot, message, args){
        if (!bot.distube.getQueue(message)) return bot.SendEmbed(message.channel, 'Error', 'There is no song playing right now.');
		if (bot.distube.getQueue(message).playing) return bot.SendEmbed(message.channel, 'Error', 'The song is not paused.');
		bot.distube.resume(message)
		message.react('👌')
    },
};