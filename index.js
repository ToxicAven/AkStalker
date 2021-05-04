require('dotenv').config()
var mineflayer = require('mineflayer');
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const afk= require('./afk')
const hook = new Webhook(process.env.WEBHOOK);
const player128 = "https://minotar.net/helm/"+ process.env.HUNTED + "/128.png";
hook.setUsername('AkStalker');
hook.setAvatar(player128);

var options = {
    host: process.env.SERVER,
    port: 25565,
    username: process.env.EMAIL,
    version: "1.12.2",
    password: process.env.PASSWORD
};

var bot = mineflayer.createBot(options);
bot.loadPlugin(afk.afk)
bindEvents(bot);

function bindEvents(bot) {

    bot.afk.start()

    bot.on('spawn', function() {
          console.log(`\n------------\nAkStalker Connected\n------------`)
      });

    bot.on('playerJoined', function(player) {
        if (player.username == process.env.HUNTED) {
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
.setTitle(process.env.HUNTED + ' Located!')
.setAuthor('AkStalker', player128)
.addField(process.env.HUNTED + ' Spotted on', process.env.SERVER)
.setColor('#ff00ff')
.setThumbnail(player128)
.setTimestamp();

function relog() {
    console.log("Attempting to reconnect...");
    bot = mineflayer.createBot(options);
    bindEvents(bot);
}