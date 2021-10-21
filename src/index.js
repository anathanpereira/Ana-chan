require("dotenv").config();

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.GUILDS] });

const generateRandomNumber = (min, max) =>  {
    return Math.floor(Math.random() * (max - min) + min);
      };

client.on('raedy', ()=>{
    console.log(`${client.user.tag} has logged in`);
});


client.on('message', (message) => {
    console.log(message.content);
    if(message.content === 'oi ana-chan'){
        message.reply('Oi 👉👈');
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

});


client.login(process.env.TOKEN);

