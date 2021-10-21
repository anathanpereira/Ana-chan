//https://discord.js.org/#/

//https://discord.com/developers/docs/topics/gateway#list-of-intents

require("dotenv").config();

const { Client, Intents, Message } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

const PREFIX ='a!'


var servers = {};

const generateRandomNumber = (min, max) =>  {
    return Math.floor(Math.random() * (max - min) + min);
};

client.on('ready', ()=>{
    console.log(`${client.user.tag} has logged in`);
});


client.on('message', (message) => {
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
            if(!args[1]){
                message.channel.send("Falto o link bobinho hihi");
                return;
            }

            if(!message.member.voiceChannel){
                message.channel.send("Flor, vc tem q ta numa sala pra tocar musica");
                return;
            }

            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }
            
            var server = servers[message.guild.id];


    }

    
});


client.login(process.env.TOKEN);

