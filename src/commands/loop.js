const { EmbedBuilder } = require('discord.js');
const config = require("../config.json");

module.exports = {
    name: 'loop',
    description: "Loop the current song or queue.",
    aliases: ['repeat'],
    inVoiceChannel: true,
    execute(bot, message, args){
        if (!bot.distube.getQueue(message)) return bot.SendEmbed(message.channel, 'Error', 'There is no song playing right now.');
		const mode = bot.distube.setRepeatMode(message)
		message.channel.send(`Set repeat mode to \`${mode ? mode === 2 ? 'All Queue' : 'This Song' : 'Off'}\``)
    },
};