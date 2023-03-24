const { EmbedBuilder } = require('discord.js');
const config = require("../config.json");
const db = require('quick.db');

module.exports = {
    name: 'playing',
    description: "Show the current song.",
    aliases: ['np', 'nowplaying', 'current'],
    execute(bot, message, args){
        const queue = bot.distube.getQueue(message)
		if (!queue) {
			bot.SendEmbed(message.channel, 'Error', `There is nothing playing right now!`)
		} else {
            const song = queue.songs[0]
            if (!song) return;
			const embed = new EmbedBuilder()
            .setColor('#eb3d34')
            .setTitle('Current Song')
            .setDescription(`Playing **${song.name}** (${song.formattedDuration})\nRequested by ${song.user.tag}`)
            queue.textChannel.send({
				embeds: [ embed ],
				//ephemeral: true
			});
		}
    },
};