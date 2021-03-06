// Static variables
const Discord = require('discord.js');
const mongoose = require('mongoose');
const client = new Discord.Client();
const distube = require ('distube');
const prefix = "."
// Random Color Function
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
    }
// Color Array & Function for picking colors
const colorarray = [
    "#63b598", "#ce7d78", "#ea9e70", "#a48a9e", "#c6e1e8", "#648177" ,"#0d5ac1" ,
    "#f205e6" ,"#1c0365" ,"#14a9ad" ,"#4ca2f9" ,"#a4e43f" ,"#d298e2" ,"#6119d0",
    "#d2737d" ,"#c0a43c" ,"#f2510e" ,"#651be6" ,"#79806e" ,"#61da5e" ,"#cd2f00" ,
    "#9348af" ,"#01ac53" ,"#c5a4fb" ,"#996635","#b11573" ,"#4bb473" ,"#75d89e" ,
    "#2f3f94" ,"#2f7b99" ,"#da967d" ,"#34891f" ,"#b0d87b" ,"#ca4751" ,"#7e50a8" ,
    "#c4d647" ,"#e0eeb8" ,"#11dec1" ,"#289812" ,"#566ca0" ,"#ffdbe1" ,"#2f1179" ,
    "#935b6d" ,"#916988" ,"#513d98" ,"#aead3a", "#9e6d71", "#4b5bdc", "#0cd36d",
    "#250662", "#cb5bea", "#228916", "#ac3e1b", "#df514a", "#539397", "#880977",
    "#f697c1", "#ba96ce", "#679c9d", "#c6c42c", "#5d2c52", "#48b41b", "#e1cf3b",
    "#5be4f0", "#57c4d8", "#a4d17a", "#225b8", "#be608b", "#96b00c", "#088baf",
    "#f158bf", "#e145ba", "#ee91e3", "#05d371", "#5426e0", "#4834d0", "#802234",
    "#6749e8", "#0971f0", "#8fb413", "#b2b4f0", "#c3c89d", "#c9a941", "#41d158",
    "#fb21a3", "#51aed9", "#5bb32d", "#807fb", "#21538e", "#89d534", "#d36647",
    "#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3",
    "#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec",
    "#1bb699", "#6b2e5f", "#64820f", "#1c271", "#21538e", "#89d534", "#d36647",
    "#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3",
    "#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec",
    "#1bb699", "#6b2e5f", "#64820f", "#1c271", "#9cb64a", "#996c48", "#9ab9b7",
    "#06e052", "#e3a481", "#0eb621", "#fc458e", "#b2db15", "#aa226d", "#792ed8",
    "#73872a", "#520d3a", "#cefcb8", "#a5b3d9", "#7d1d85", "#c4fd57", "#f1ae16",
    "#8fe22a", "#ef6e3c", "#243eeb", "#1dc18", "#dd93fd", "#3f8473", "#e7dbce",
    "#421f79", "#7a3d93", "#635f6d", "#93f2d7", "#9b5c2a", "#15b9ee", "#0f5997",
    "#409188", "#911e20", "#1350ce", "#10e5b1", "#fff4d7", "#cb2582", "#ce00be",
    "#32d5d6", "#17232", "#608572", "#c79bc2", "#00f87c", "#77772a", "#6995ba",
    "#fc6b57", "#f07815", "#8fd883", "#060e27", "#96e591", "#21d52e", "#d00043",
    "#b47162", "#1ec227", "#4f0f6f", "#1d1d58", "#947002", "#bde052", "#e08c56",
    "#28fcfd", "#bb09b", "#36486a", "#d02e29", "#1ae6db", "#3e464c", "#a84a8f",
    "#911e7e", "#3f16d9", "#0f525f", "#ac7c0a", "#b4c086", "#c9d730", "#30cc49",
    "#3d6751", "#fb4c03", "#640fc1", "#62c03e", "#d3493a", "#88aa0b", "#406df9",
    "#615af0", "#4be47", "#2a3434", "#4a543f", "#79bca0", "#a8b8d4", "#00efd4",
    "#7ad236", "#7260d8", "#1deaa7", "#06f43a", "#823c59", "#e3d94c", "#dc1c06",
    "#f53b2a", "#b46238", "#2dfff6", "#a82b89", "#1a8011", "#436a9f", "#1a806a",
    "#4cf09d", "#c188a2", "#67eb4b", "#b308d3", "#fc7e41", "#af3101", "#ff065",
    "#71b1f4", "#a2f8a5", "#e23dd0", "#d3486d", "#00f7f9", "#474893", "#3cec35",
    "#1c65cb", "#5d1d0c", "#2d7d2a", "#ff3420", "#5cdd87", "#a259a4", "#e4ac44",
    "#1bede6", "#8798a4", "#d7790f", "#b2c24f", "#de73c2", "#d70a9c", "#25b67",
    "#88e9b8", "#c2b0e2", "#86e98f", "#ae90e2", "#1a806b", "#436a9e", "#0ec0ff",
    "#f812b3", "#b17fc9", "#8d6c2f", "#d3277a", "#2ca1ae", "#9685eb", "#8a96c6",
    "#dba2e6", "#76fc1b", "#608fa4", "#20f6ba", "#07d7f6", "#dce77a", "#77ecca"]
    function getcolor() {
        let colors = colorarray[Math.floor(Math.random() * colorarray.length)];
        return colors
    }
    // Distube
    const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || 'Off'}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? 'All Queue' : 'This Song' : 'Off'}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
    client.distube = new distube(client, { searchSongs: true, emitNewSongOnly: true})
    client.distube
        .on("playSong", (message, queue, song) => message.channel.send(
            `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
        ))
        .on("addSong", (message, queue, song) => message.channel.send(
            `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
        ))
        .on("playList", (message, queue, playlist, song) => message.channel.send(
            `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
        ))
        .on("addList", (message, queue, playlist) => message.channel.send(
            `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
        ))
        // DisTubeOptions.searchSongs = true
        .on("searchResult", (message, result) => {
            let i = 0;
            const embed = new Discord.MessageEmbed()
             .setColor(getRandomColor())
             .setTitle('Pick a Song')
             .setDescription(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)
             .setFooter('LunaV2', 'https://i.ibb.co/xqzy2T8/circle-cropped.png');
             message.channel.send(embed);
        })
        // DisTubeOptions.searchSongs = true
        .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
        .on("error", (message, e) => {
            console.error(e)
            message.channel.send("An error encountered: " + e);
        });
    // Login
client.login("ODMyODY3MTA5MDQ1MjcyNjE2.YHqB8A.i8IPN2Cc48ouihRN2lBBBC7z_U4")
client.on(`ready`, function () {
client.user.setActivity(`KC#5309`, { type: 'WATCHING' })
console.log(`${client.user.tag} Online!`)})
client.on('message', async (message) => {
    if (message.author.bot) return;
    let bonk = message.content.split(" ")[0]
    bonk = bonk.slice(prefix);
    let bonkk = message.content.split(" ").slice(0);
    let command = message.content.split(" ")[0]
    command = command.slice(prefix);
    let args = message.content.split(" ").slice(1);
    if (command === `${prefix}help`) {
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor(getcolor())
            .setTitle('Commands')
            .setAuthor('Help')
            .addField(`**.music**`, '`music commands`', true)
            .addField(`**.bonk**`, '`Bonk command ofc`', true)
            .addField(`**.copy**`, '`Send me a message to copy!`', true)
            .addField(`**.tts**`, '`Sends a tts message!`', true)
            .addField(`**.ping**`, '`funny`', true)
            .addField(`**.Credits**`, '`Find out who made the bot | Kinda obvious tho`', true)
            .setTimestamp()
            .setFooter('LunaV2', 'https://i.ibb.co/xqzy2T8/circle-cropped.png');
        message.channel.send(exampleEmbed);
            console.log(`${message.author.tag} in the server: ${message.guild} ran command .help`)
    }
    if (command === `${prefix}music`) {
        const embed = new Discord.MessageEmbed()
            .setColor(getcolor())
            .setTitle('Music Commands')
            .addField(`**.play [songname]**`, '`Plays a song of your choice!`', true)
            .addField(`**.stop**`, '`Stops music playback`', true)
        message.channel.send(embed)
        console.log(`${message.author.tag} in the server: ${message.guild} ran command .music`)
    }
    if (command === `${prefix}bonk`) {
        const embed = new Discord.MessageEmbed()
            .setColor(getRandomColor())
            .setImage('https://media.tenor.com/images/39ea61de1402fa18f8452ac8074a4726/tenor.gif')
            .setTimestamp()
            .setFooter('LunaV2', 'https://i.ibb.co/xqzy2T8/circle-cropped.png');
        message.channel.send(embed);
        console.log(`${message.author.tag} in the server: ${message.guild} ran command .bonk`)
    }
    if (command === `${prefix}copy`) {
        if (!args.length) {
            console.log(`${message.author.tag} in the server: ${message.guild} tried to run command .copy`)
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor(getRandomColor())
                .setTitle('Copy')
                .addFields(
                    { name: 'What...', value: "You didn't specify a message to copy!" }
                )
                .setTimestamp()
                .setFooter('LunaV2', 'https://i.ibb.co/xqzy2T8/circle-cropped.png');
            return message.channel.send(exampleEmbed);
        }
        let saymessage = message.content
        message.channel.send(saymessage.replace(".copy", ""))
    console.log(`${message.author.tag} in the server: ${message.guild} ran command .copy`)
    }
    if (command === `${prefix}Credits`) {
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor(getRandomColor())
            .setTitle('Commands')
            .addFields(
                { name: 'LunaV2', value: 'Made by KC#5309' }
            )
            .setTimestamp()
            .setFooter('LunaV2', 'https://i.ibb.co/xqzy2T8/circle-cropped.png');
        message.channel.send(exampleEmbed);
        console.log(`${message.author.tag} in the server: ${message.guild} ran command .Credits`)
    }
    if (command === `${prefix}ping`) {
        message.channel.send('', { files: ['https://cdn.discordapp.com/attachments/779060677515411511/779165745514283038/bingus3_8.mp4'] });
        console.log(`${message.author.tag} in the server: ${message.guild} ran command .ping`)
    }
 if (command === `${prefix}restart`) {
        if (message.author.id === `822925160348385300`) {
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor(getRandomColor())
                .setTitle('Restart')
                .addFields(
                    { name: 'Restarting! KC', value: 'I will be back online soon...' }
                )
                .setTimestamp()
                .setFooter('LunaV2', 'https://i.ibb.co/xqzy2T8/circle-cropped.png');
            message.channel.send(exampleEmbed);
            console.log(`${message.author.tag} in the server: ${message.guild} ran command .restart`)
            setTimeout(function () {    
                client.destroy()
            }, 1000)
            setTimeout(function () {
                client.login("ODMyODY3MTA5MDQ1MjcyNjE2.YHqB8A.uRL4k_dJd_01OW1p2tcaqKjWyq0")
            }, 10000)
        } else {
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor(getRandomColor())
                .setTitle('Nope')
                .addFields(
                    { name: 'Only KC can use this command!', value: 'nice try' }
                )
                .setTimestamp()
                .setFooter('LunaV2', 'https://i.ibb.co/xqzy2T8/circle-cropped.png');
            message.channel.send(exampleEmbed);
           console.log(`${message.author.tag} in the server: ${message.guild} tried to run command .restart`)
        }
    }
    if (command === `${prefix}tts`) {
        const description = args.slice(0).join(" ");
        message.channel.send(description, {
            tts: true
        })
        console.log(`${message.author.tag} in the server: ${message.guild} ran command .tts`)
    }
    if (command === `${prefix}servers`) {
        if (message.author.id === `822925160348385300`) {
            const embed = new Discord.MessageEmbed()
                .setColor(getRandomColor())
                .setTitle('Server Count')
                .addFields(
                    { name: `I am in ${client.guilds.cache.size} servers KC!`, value: "bonk" }
                )
                .setTimestamp()
                .setFooter('LunaV2', 'https://i.ibb.co/xqzy2T8/circle-cropped.png');
            message.channel.send(embed);
            console.log(`${message.author.tag} in the server: ${message.guild} ran command .servers`)
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor(getRandomColor())
                .setTitle('Nope')
                .addFields(
                    { name: 'Only KC can use this command!', value: 'nice try' }
                )
                .setTimestamp()
                .setFooter('LunaV2', 'https://i.ibb.co/xqzy2T8/circle-cropped.png');
            message.channel.send(embed);
            console.log(`${message.author.tag} in the server: ${message.guild} tried to run command .servers`)
        }
    }
    //  Music Control Commands
    if (command === `${prefix}play`) {
        if(!message.member.voice.channel) return message.reply('Hey you arent in a voice channel, idiot.')
        const music = args.join(" "); // .play <args>
        if(!music) return message.reply("What do you want to play smoothbrain?")
        await client.distube.play(message, music)
    }
    if (command === `${prefix}stop`) {
        if(!message.member.voice.channel) return message.reply('Hey you arent in a voice channel, idiot.')
        await client.distube.stop(message)
        const embed = new Discord.MessageEmbed()
        .setColor(getRandomColor())
        .setTitle('Stop Message')
        .addFields(
            { name: '`Stopped Music Playback!`', value: "** **" }
        )
        .setFooter('LunaV2', 'https://i.ibb.co/xqzy2T8/circle-cropped.png');
    await message.channel.send(embed);
    }
    if (command === `${prefix}skip`) {
        if(!message.member.voice.channel) return message.reply('Hey you arent in a voice channel, idiot.')
        await client.distube.skip(message)
        const embed = new Discord.MessageEmbed()
        .setColor(getRandomColor())
        .setTitle('Skip Message')
        .addFields(
            { name: '`Skipped Current Song!`', value: "** **" }
        )
        .setFooter('LunaV2', 'https://i.ibb.co/xqzy2T8/circle-cropped.png');
    await message.channel.send(embed);
    }
    if (command === `${prefix}queue`) {
		const queue = client.distube.getQueue(message)
		message.channel.send(`Current queue:\n${queue.songs.map((song, id) =>
			`**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``).slice(0, 10).join('\n')}`)
	}
    if (command === `${prefix}loop`) {
        if(!message.member.voice.channel) return message.reply('Hey you arent in a voice channel, idiot.')
        await client.distube.setRepeatMode(message, parseInt(args[0]));
        await message.channel.send("Looping Enabled");
	}
});
