//https://discord.js.org/#/

//https://discord.com/developers/docs/topics/gateway#list-of-intents

require("dotenv").config();

const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, AudioResource, createAudioResource, StreamType } = require('@discordjs/voice');
const { Client, Intents, Message, VoiceChannel } = require('discord.js');
const client = new Client({
  intents: [
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_WEBHOOKS,
  ],
});

const PREFIX ='a!'

var servers = {};

const generateRandomNumber = (min, max) =>  {
    return Math.floor(Math.random() * (max - min) + min);
};

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in`);
    client.channels.fetch('703677055077843036').then(channel => {
        channel.send("Patroa chegou 💁‍♀️")
    });
});

client.on('invalidated', () => {
    client.channels.fetch('703677055077843036').then(channel => {
        channel.send("Patroa vazou xx");
    });
});

client.on('message', async (message) => {
    console.log(message.members);
    console.log('['+ message.author.tag+'] '+message.content);

    if(message.content === 'oi ana-chan'){
        message.reply('Oi 👉👈 '+message.author.username);
    }

    if(message.content === 'd6'){
        message.reply('🎲 '+generateRandomNumber(1,6).toString());
    }

    if(message.content === '50 50'){
        if(generateRandomNumber(1,10)%2 === 0){
            message.reply('🪙 deu cara');
        }else{
            message.reply('🪙 deu coroa');
        }
    }

    if(message.author.tag ==='Luan#8233'){
        if(generateRandomNumber(1,10)%2 === 0){
            message.react('😂');
        }else{
            message.react('💩');
        }
        
    }

    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'p':
            //validações
            if(!args[1]){
                message.channel.send("Falto o link bobinho hihi");
                return;
            }
            if(!message.member.voice.channel){
                message.channel.send("Flor, vc tem q ta numa sala pra tocar musica");
                return;
            }

            //entra na sala
            let voiceChannel = message.member.voice.channel;
            joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });


            const connection = getVoiceConnection(message.guild.id);

            //busca no yt
            const videoFinder = async (query) => {
                const videoResult = await ytSearch(query);

                return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
            }

            args.shift()
            const video = await videoFinder(args.join(' '));

            if (video) {
                const stream = await ytdl(video.url, {filter: 'audioonly'});
               
                const resource = createAudioResource(stream, {
                    inputType: StreamType.Arbitrary,
                });

                const player = createAudioPlayer();
                player.play(resource);
                connection.subscribe(player);
            }
            
            break;

        case 'd':
            connection.destroy();
    }

    
});


client.login(process.env.TOKEN);

