const { EmbedBuilder } = require('discord.js');
const config = require("../config.json");

module.exports = {
    name: 'play',
    description: "Play a song.",
    aliases: ['p'],
    inVoiceChannel: true,
    async execute(bot, message, args){
        if (!args[0]) return bot.SendEmbed(message.channel, 'Error', 'You need to enter a song.')
        await bot.distube.play(message.member.voice.channel, args.join(' '));
    },
};