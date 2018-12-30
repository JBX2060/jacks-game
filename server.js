//logging
var fs = require('fs');
function writeLog(buf) {
    var fd = fs.openSync("log.txt", 'a+');
    fs.write(fd, buf, 0, buf.length, 0, function () {});
}















//server stuff
var http = require('http');
var express = require('express');

var app = express();

app.get(/[\s\S]*/, function (req, res) {
    if (!/auth.json/.test(req.url)) {
        res.sendFile(__dirname + req.url, {}, function (err) {
            if (err) {
                res.sendFile(__dirname + "/404.html");
            }
        });
    } else {
        res.send("fuck you");
    }
    writeLog("OPENED URL: " + req.url + "     TIME: " + new Date() + "     IP: " + req.ip + "\n");
});

app.listen(42069, function () {
	console.log('App successfully started.');
});










//DISCORD BOT (feel free to remove everything below this if you just want my portfolio, idk why you'd want it though lmao)
var Discord = require('discord.io');
var request = require('request');
var auth = require('./auth.json');
var userdata = require('./userdata.json');
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    console.log("test");
});

var so_status = true;

function writeToBalance(key, value) {
    var data2 = userdata;
    data2[key] = value;
    console.log(data2);
    fs.writeFile('userdata.json', JSON.stringify(data2), function(err) {
        if(err) throw err;
    });
}

bot.on('message', function (user, userID, channelID, message, evt) {
    if (/^==/.test(message)) {
        var command = message.split(" ");
        if (command[0] == "==+") {
            var sum = 0;

            for (var i = 1; command.length > i; i++) {
                sum += Number(command[i]);
            }

            bot.sendMessage({
                to: channelID,
                message: "Those numbers add up to " + sum
            });
        }
        if (command[0] == "==*") {
            var product = 1;

            for (var i = 1; command.length > i; i++) {
                product *= Number(command[i]);
            }

            bot.sendMessage({
                to: channelID,
                message: "Those numbers multiply to " + product
            });
        }
        if (command[0] == "==sqrt") {
            var sqrt = 0;

            if (command[1]) {
                sqrt = Math.sqrt(Number(command[1]));
            }

            bot.sendMessage({
                to: channelID,
                message: "The square root of that number is " + sqrt
            });
        }
        if (command[0] == "==madtanks") {
            var sqrt = 0;

            if (command[1]) {
                sqrt = Math.sqrt(Number(command[1]));
            }

            bot.sendMessage({
                to: channelID,
                message: 'Paste the following code into your browser console to turn all diep tanks into madman emojis: \n \n `var ctx=document.getElementById("canvas").getContext("2d");var madman=new Image();madman.src="https://discordemoji.com/assets/emoji/Themadman.png";ctx.arc=function(x,y,r){ctx.drawImage(madman,x-r,y-r,r*2,r*2)}`'
            });
        }
        if (command[0] == "==balance") {
            if (userdata[userID] !== undefined) {
                bot.sendMessage({
                    to: channelID,
                    message: "<@" + userID + ">'s balance: " + userdata[userID]
                });
            } else {
                writeToBalance(userID, 0);
                bot.sendMessage({
                    to: channelID,
                    message: "<@" + userID + ">'s balance: " + userdata[userID]
                });
            }
        }
        if (command[0] == "==help") {
            bot.sendMessage({
                to: channelID,
                message: "Commands (all commands begin with `==`, and following arguments are separated by spaces): \n `+`: Adds all following numbers together. \n `*`: Multiplies all following numbers together. \n `sqrt`: Returns the square root of the following number. \n `madtanks`: Get the madtanks script! \n End any message with a question mark `?`, and adasbot will search it on StackOverflow! If it finds nothing, your question sucks ass and you should feel bad."
            });
        }
    }
    if (/\x3f$/.test(message) && channelID != 358671241059762177) {
        request({ url: 'https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&q=' + message + '&site=stackoverflow', gzip: true }, function (error, response, body) {
            if (JSON.parse(body).items.length > 0) {
                bot.sendMessage({
                    to: channelID,
                    message: "<@" + userID + "> " + JSON.parse(body).items[0].link
                });
            } else {
                bot.sendMessage({
                    to: channelID,
                    message: "<@" + userID + "> " + "Found nothing on StackOverflow. Your question sucks ass."
                });
            }
          });
    }
});