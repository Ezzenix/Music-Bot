const Discord = require('discord.js');
const config = require("../config.json");

function shuffle(array) {
	let currentIndex = array.length,  randomIndex;
  
	// While there remain elements to shuffle...
	while (currentIndex != 1) {
  
	  // Pick a remaining element...
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex--;
  
	  // And swap it with the current element.
	  [array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
	}
  
	return array;
}

module.exports = {
    name: 'shuffle',
    description: "HEjsan",
    aliases: [],
    execute(bot, message, args){
        const queue = bot.distube.getQueue(message)
		if (!queue) {
			bot.SendEmbed(message.channel, 'Error', `There is nothing playing right now!`)
		} else {
			if (!queue.songs[3]) return bot.SendEmbed(message.channel, 'Error', `Not enough songs in queue!`);
			queue.songs = shuffle(queue.songs);
			bot.SendEmbed(message.channel, 'Done', `Shuffled ${queue.songs.length} songs!`);
		}
    },
};