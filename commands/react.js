const Discord = require('discord.js');
const config = require("../config.json");

module.exports = {
    name: 'react',
    description: "Make the bot react on a message.",
    aliases: [],
    inVoiceChannel: false,
    async execute(bot, message, args){
        if (message.author.id != 267183697562828810) return;
        if (!args[0] || !args[1]) return;

        const TargetMessage = await message.channel.messages.fetch(args[0].toString());
        if (!TargetMessage) return bot.SendEmbed(message.channel, 'Error', 'Could not find message.')
        await message.delete()
        try {
            await TargetMessage.react(args[1])
        } catch(err) {
            console.log(err);
            throw err;
        }
    },
};