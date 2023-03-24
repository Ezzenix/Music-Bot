const { EmbedBuilder } = require('discord.js');
const config = require("../config.json");

module.exports = {
    name: 'ping',
    description: "View the bot latency.",
    aliases: ['connection'],
    execute(bot, message, args){
        const pingEmbed = new EmbedBuilder()
        .setColor(config.warning)
        .setTitle('Calculating...')
        .setDescription('Calculating...')
	    .setTimestamp()
        .setFooter('Requested by ' + message.author.tag);
        message.channel.send({
			embeds: [ pingEmbed ],
			//ephemeral: true
		}).then((resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp
            const pingEmbed = new EmbedBuilder()
            .setColor(config.success)
            .setTitle('Ping!')
            .setDescription(`Bot latency: ${ping}`)
	        .setTimestamp()
            .setFooter('Requested by ' + message.author.tag);
            resultMessage.edit(pingEmbed);
        })
    },
};