const Discord = require('discord.js');
const config = require("../config.json");

module.exports = {
    name: 'help',
    description: "Help page.",
    aliases: ['use', 'how'],
    execute(bot, message, args){
        const commands = [
            'My prefix is **?**.',
            '',
            '**?play** - Play a song.',
            '**?queue** - Show the current queue.',
            '**?playing** - Show the current song.',
            '**?pause** - Pause the current song.',
            '**?resume** - Resume playing the current song..',
            '**?skip** - Skip to the next song in queue.',
            '**?loop** - Loop the current song or queue.',
            '**?stop** - Stop playing songs.',
        ] 

        const helpEmbed = new Discord.MessageEmbed()
        .setColor(message.channel.guild.me.displayColor)
        .setTitle('Help')
        .setDescription(commands.join('\n'))
        message.channel.send(helpEmbed)
    },
};