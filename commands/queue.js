const Discord = require('discord.js');
const config = require("../config.json");

module.exports = {
    name: 'queue',
    description: "Show the current queue.",
    aliases: ['q'],
    execute(bot, message, args){
        const queue = bot.distube.getQueue(message)
		if (!queue) {
			bot.SendEmbed(message.channel, 'Error', `There is nothing playing right now!`)
		} else {
			bot.SendEmbed(message.channel, 'Queue', `${queue.songs.map(
				(song, id) =>
					`**${song.name}** (${song.formattedDuration})`,
			)
			.slice(0, 10)
			.join('\n')}`)
		}
    },
};