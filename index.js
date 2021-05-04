require('dotenv').config()
var mineflayer = require('mineflayer');
const { Webhook } = require('discord-webhook-node');
const hook = new Webhook(process.env.WEBHOOK);
const IMAGE_URL = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';
hook.setUsername('AkStalker');
hook.setAvatar(IMAGE_URL);

var options = {
    host: process.env.SERVER,
    port: 25565,
    username: process.env.EMAIL,
    version: "1.12.2",
    password: process.env.PASSWORD
};

var bot = mineflayer.createBot(options);
bindEvents(bot);

function bindEvents(bot) {

  bot.on('playerJoined', function(player) {
    if (player.username == "97g") {
        hook.send(embed)
    }
  });

    bot.on('error', function(err) {
        console.log('Error attempting to reconnect: ' + err.errno + '.');
        if (err.code == undefined) {
            console.log('Invalid credentials OR bot needs to wait because it relogged too quickly.');
            console.log('Will retry to connect in 30 seconds. ');
            setTimeout(relog, 30000);
        }
    });

    bot.on('end', function() {
        console.log("Bot has ended");
        setTimeout(relog, 30000);  
    });
}

const embed = new MessageBuilder()
.setTitle('Akrz Located!')
.setAuthor('AkStalker', 'https://minotar.net/helm/Akrz/128.png')
.addField('Ak Spotted on', process.env.SERVER)
.setColor('#ff00ff')
.setThumbnail('https://minotar.net/helm/Akrz/128.png')
.setTimestamp();

function relog() {
    console.log("Attempting to reconnect...");
    bot = mineflayer.createBot(options);
    bindEvents(bot);
}