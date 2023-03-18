const Discord = require('discord.js');
const config = require("../config.json");

module.exports = {
    name: 'play',
    description: "Play a song.",
    aliases: ['p'],
    inVoiceChannel: true,
    async execute(bot, message, args){
        if (!args[0]) return bot.SendEmbed(message.channel, 'Error', 'You need to enter a song.')
        if (args[0] == 'good') {
            await bot.distube.play(message, 'Like Luke - Sing Your Tunes');
            await bot.distube.play(message, 'Ballpoint - WalkSlowly');
            await bot.distube.play(message, 'Ballpoint - Chutes and Ladders');
            await bot.distube.play(message, 'Ballpoint - Things to Do');
        } else {
            await bot.distube.play(message, args.join(' '));
        }
    },
};