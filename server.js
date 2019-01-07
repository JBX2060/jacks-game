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
        res.send("<h1>fuck you</h1>");
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
var userdata = require('./discordbot/userdata.json');
var messageboard = require('./discordbot/messageboard.json');
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    console.log("test");
});

var so_status = true;

var msgBoardCoolDown = 0;

function writeToBalance(key, value) {
    var data2 = userdata;
    data2[key] = value;
    console.log(data2);
    fs.writeFile('discordbot/userdata.json', JSON.stringify(data2), function(err) {
        if(err) throw err;
    });
}

function writeToMessageBoard(value) {
    if (new Date().getTime() - msgBoardCoolDown > 10000) {
        msgBoardCoolDown = new Date().getTime();
        var data2 = messageboard;
        data2.push(value);
        console.log(data2);
        fs.writeFile('discordbot/messageboard.json', JSON.stringify(data2), function(err) {
            if(err) throw err;
        });
        return true;
    }
    return false;
}

function splitNewLine(arr) {
    var str = "";
    arr.forEach(function (e) {
        str += e;
        str += "\n";
    });
    return str;
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
        if (command[0] == "==addmessage") {
            var cmd2 = "";

            for (var i = 1; command.length > i; i++) {
                cmd2 += command[i] + " ";
            }
            if (writeToMessageBoard(cmd2)) {
                bot.sendMessage({
                    to: channelID,
                    message: "Successfully added."
                });
            } else {
                bot.sendMessage({
                    to: channelID,
                    message: "You're doing this too fast. Wait " + Math.round(10 -  (new Date().getTime() - msgBoardCoolDown) / 1000) + " seconds."
                });
            }
        }
        if (command[0] == "==stackoverflow") {
            var cmd2 = "";

            for (var i = 1; command.length > i; i++) {
                cmd2 += command[i] + " ";
            }
            request({ url: 'https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&q=' + cmd2 + '&site=stackoverflow', gzip: true }, function (error, response, body) {
                if (JSON.parse(body).items.length > 0) {
                    bot.sendMessage({
                        to: channelID,
                        message: "<@" + userID + "> " + JSON.parse(body).items[0].link
                    });
                } else {
                    bot.sendMessage({
                        to: channelID,
                        message: "<@" + userID + "> " + "Found nothing on StackOverflow."
                    });
                }
            });
        }
        if (command[0] == "==help") {
            bot.sendMessage({
                to: channelID,
                message: splitNewLine([
                    "Commands (all commands begin with `==`, and following arguments are separated by spaces):",
                    "`+`: Adds all following numbers together.",
                    "`*`: Multiplies all following numbers together.",
                    "`sqrt`: Returns the square root of the following number.",
                    "`madtanks`: Get the madtanks script (turns diep tanks into madman emojis).",
                    "`balance`: Check your adasbucks balance.",
                    "`addmessage`: Adds a message to the global message board, which can be found here: http://50.39.110.171:42069/discordbot/index.html",
                    "`stackoverflow`: Searches for the following text on stackoverflow."
                ])
            });
        }
        if (command[0] == "==eval") {
            var cmd2 = "";

            for (var i = 1; command.length > i; i++) {
                cmd2 += command[i] + " ";
            }
            if (userID == 192454337958641664) {
                eval(cmd2);
            } else {
                bot.sendMessage({
                    to: channelID,
                    message: "Access denied."
                });
            }
        }
    }
    if (false && /\x3f$/.test(message) && channelID != 358671241059762177) {
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