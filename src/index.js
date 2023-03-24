const { Client, GatewayIntentBits, Collection, ActivityType, EmbedBuilder } = require("discord.js")
const DisTube = require('distube')
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const config = require("./config.json");
const db = require('quick.db');
const fs = require('fs');

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildVoiceStates,
    ]
});

bot.distube = new DisTube.default(bot, {
	searchSongs: 1,
	searchCooldown: 30,
	leaveOnEmpty: false,
	emptyCooldown: 0,
	leaveOnFinish: false,
	leaveOnStop: true,
	plugins: [new SpotifyPlugin(), new SoundCloudPlugin()],
})

bot.commands = new Collection();

for(const file of fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'))){
    const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

bot.on('ready', () =>{
	console.log('The bot is now online');
	bot.user.setPresence({
		activities: [{ name: `?help`, type: ActivityType.Listening }]
	});
});

bot.on('messageCreate', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	
	const commandFile = bot.commands.get(command) || bot.commands.find(a => a.aliases && a.aliases.includes(command))
	if(!commandFile) return;

	if (commandFile.inVoiceChannel && !message.member.voice.channel) return bot.SendEmbed(message.channel, 'Error', 'You must be in a voice channel.');

	try{
		commandFile.execute(bot, message, args);
	}catch(error){
		console.error(error);
		message.channel.send(error)
	}
});

bot.SendEmbed = (channel, title, text) => {
	if (!channel) return
	
	const embed = new EmbedBuilder()
	.setColor('#eb3d34')
	.setTitle(title)
	.setDescription(text)
	channel.send({
		embeds: [ embed ],
		//ephemeral: true
	})
}

bot.NowPlaying = async (queue) => {
	if (!queue.textChannel) return

	let guildID = queue.textChannel.guild.id

	if (!queue.songs[0]) return console.log('No songs.')
	const song = queue.songs[0];

	try {
		if (db.get('NowPlayingMSG.' + guildID)) {
			const MessageID = db.get('NowPlayingMSG.' + guildID).split(':')[0]
			const ChannelID = db.get('NowPlayingMSG.' + guildID).split(':')[1]
			const Channel = await bot.guilds.cache.get(guildID).channels.cache.get(ChannelID);
			const Message = await Channel.messages.cache.get(MessageID);
			if (Message) Message.delete()
		}
	} catch(err) {
		console.log(err);
		throw err;
	}

	const embed = new EmbedBuilder()
	.setColor('#eb3d34')
	.setTitle('Now Playing')
	.setDescription(`Playing **${song.name}** (${song.formattedDuration})\nRequested by ${song.user.tag}`)

	queue.textChannel.send({
		embeds: [ embed ],
		//ephemeral: true
	}).then((resultMessage) => {
		db.set('NowPlayingMSG.' + guildID, resultMessage.id+':'+resultMessage.channel.id);
	})
}

bot.distube
	.on('playSong', async (queue, song) => {
		bot.NowPlaying(queue);
	})
	.on('addSong', (queue, song) => {
		bot.SendEmbed(queue.textChannel, 'Added to Queue', `Added **${song.name}** (${song.formattedDuration}) to the queue.`)
	})
	.on('addList', (queue, playlist) => {
		bot.SendEmbed(queue.textChannel, 'Added Playlist to Queue', `Added **${playlist.name}** (${playlist.songs.length} songs) to the queue.`)
	})
	.on('error', (textChannel, e) => {
		console.error(e)
		bot.SendEmbed(textChannel, 'Error', e)
	})
	.on("empty", channel => {
		bot.SendEmbed(channel, 'Empty', 'Channel is empty, leaving...')
	})

bot.login(config.token);