const Discord = require('discord.js');
const config = require("../config.json");

module.exports = {
    name: 'ping',
    description: "View the bot latency.",
    aliases: ['connection'],
    execute(bot, message, args){
        const pingEmbed = new Discord.MessageEmbed()
        .setColor(config.warning)
        .setTitle('Calculating...')
        .setDescription('Calculating...')
	    .setTimestamp()
        .setFooter('Requested by ' + message.author.tag);
        message.channel.send(pingEmbed).then((resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp
            const pingEmbed = new Discord.MessageEmbed()
            .setColor(config.success)
            .setTitle('Ping!')
            .setDescription(`Bot latency: ${ping}`)
	        .setTimestamp()
            .setFooter('Requested by ' + message.author.tag);
            resultMessage.edit(pingEmbed);
        })
    },
};