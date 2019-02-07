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
var Discord = require('discord.js');
var request = require('request');
var auth = require('./auth.json');
var userdata = require('./discordbot/userdata.json');
var messageboard = require('./discordbot/messageboard.json');
var bot = new Discord.Client();

bot.login(auth.token);

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

var hardcoded_ships = [
    ["<@424660914785091595>", "<@455973509399838731>"],
    ["<@319626295724081153>", "<@421913609459728384>"],
    ["test", "test"]
]

function hardcoded_100(arr) {
    var return_this = false
    hardcoded_ships.forEach(function (e) {
        if ((arr[1] == e[0] && arr[2] == e[1]) || (arr[1] == e[1] && arr[2] == e[0])) {
            return_this = true;
        }
    });
    return return_this;
}


var collects = [];

var collect_chance = 0.001


function botloop() {

    if (Math.random() < collect_chance) {
        collects.push({
            channel: "358671241059762177",
            amount: Math.ceil(Math.random() * 100)
        });
        bot.channels.get(collects[collects.length - 1].channel).send('Something has appeared worth ' + collects[collects.length - 1].amount + ' adasbucks! Type `==collect` to collect it!');
    }
    
}

//setInterval(botloop, 1000);

bot.on('message', function (message) {
    var msgc = message.content;

    // if (/d[0-9]+/.test(msgc) && !message.author.bot) {
    //     for (var i = 0; /d[0-9]+/.match(msgc).length > i; i++) {
    //         message.channel.send("Rolled " + /d[0-9]+/.match(msgc)[i] + " and got `" + Math.ceil(Number(/d[0-9]+/.match(msgc)[i].slice(1)) * Math.random()) + "`");
    //     }
    // }

    // if (/^==/.test(message.content)) {
    //     var command = message.content.split(" ");
    //     if (command[0] == "==+") {
    //         var sum = 0;

    //         for (var i = 1; command.length > i; i++) {
    //             sum += Number(command[i]);
    //         }

    //         message.channel.send("Those numbers add up to " + sum);
    //     }
    //     if (command[0] == "==*") {
    //         var product = 1;

    //         for (var i = 1; command.length > i; i++) {
    //             product *= Number(command[i]);
    //         }

    //         message.channel.send("Those numbers multiply to " + product);
    //     }
    //     if (command[0] == "==sqrt") {
    //         var sqrt = 0;

    //         if (command[1]) {
    //             sqrt = Math.sqrt(Number(command[1]));
    //         }

    //         message.channel.send("The square root of that number is " + sqrt);
    //     }
    //     if (command[0] == "==madtanks") {
    //         var sqrt = 0;

    //         if (command[1]) {
    //             sqrt = Math.sqrt(Number(command[1]));
    //         }

    //         message.channel.send('Paste the following code into your browser console to turn all diep tanks into madman emojis: \n \n `var ctx=document.getElementById("canvas").getContext("2d");var madman=new Image();madman.src="https://discordemoji.com/assets/emoji/Themadman.png";ctx.arc=function(x,y,r){ctx.drawImage(madman,x-r,y-r,r*2,r*2)}`');
    //     }
    //     if (command[0] == "==balance") {
    //         userdata = require('./discordbot/userdata.json');
    //         console.log(userdata[message.author.id] === undefined);
    //         if (userdata[message.author.id] !== undefined) {
    //             message.channel.send("<@" + message.author.id + ">'s balance: " + userdata[message.author.id])
    //         } else {
    //             writeToBalance(message.author.id, 1);
    //             message.channel.send("<@" + message.author.id + ">'s balance: " + userdata[message.author.id])
    //         }
    //     }
    //     if (command[0] == "==work") {
    //         userdata = require('./discordbot/userdata.json');
    //         console.log(userdata[message.author.id] === undefined);
    //         if (userdata[message.author.id] !== undefined) {
    //             writeToBalance(message.author.id, ++userdata[message.author.id])
    //             message.channel.send("<@" + message.author.id + ">'s balance is now: " + userdata[message.author.id])
    //         } else {
    //             message.channel.send("You don't have an account! Type `==balance` to get an account.")
    //         }
    //     }
    //     if (command[0] == "==collect") {
    //         var index_to_remove = false;
    //         collects.forEach(function (e, i) {
    //             if (e.channel == message.channel.id) {
    //                 index_to_remove = i;
    //                 userdata = require('./discordbot/userdata.json');
    //                 if (userdata[message.author.id] !== undefined) {
    //                     userdata[message.author.id] += e.amount;
    //                     writeToBalance(message.author.id, userdata[message.author.id])
    //                     message.channel.send("<@" + message.author.id + "> successfully collected the... thing... I guess? Their balance is now: " + userdata[message.author.id])
    //                 } else {
    //                     message.channel.send("You don't have an account! Type `==balance` to get an account.")
    //                 }
    //                 return;
    //             }
    //         });
    //         collects.splice(index_to_remove, 1);
    //     }
    //     if (command[0] == "==say") {
    //         var cmd2 = "";

    //         for (var i = 1; command.length > i; i++) {
    //             cmd2 += command[i] + " ";
    //         }

    //         message.channel.send(cmd2);
    //     }
    //     if (command[0] == "==addmessage") {
    //         var cmd2 = "";

    //         for (var i = 1; command.length > i; i++) {
    //             cmd2 += command[i] + " ";
    //         }
    //         if (writeToMessageBoard(cmd2)) {
    //             message.channel.send("Successfully Added");
    //         } else {
    //             message.channel.send("You're doing this too fast. Wait " + Math.round(10 -  (new Date().getTime() - msgBoardCoolDown) / 1000) + " seconds.");
    //         }
    //     }
    //     if (command[0] == "==stackoverflow") {
    //         var cmd2 = "";

    //         for (var i = 1; command.length > i; i++) {
    //             cmd2 += command[i] + " ";
    //         }
    //         request({ url: 'https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&q=' + cmd2 + '&site=stackoverflow', gzip: true }, function (error, response, body) {
    //             if (JSON.parse(body).items.length > 0) {
    //                 message.channel.send("<@" + message.author.id + "> " + JSON.parse(body).items[0].link);
    //             } else {
    //                 message.channel.send("<@" + message.author.id + "> " + "Found nothing on StackOverflow.");
    //             }
    //         });
    //     }
    //     if (command[0] == "==help") {
    //         message.channel.send(splitNewLine([
    //             "Commands (all commands begin with `==`, and following arguments are separated by spaces):",
    //             "`+`: Adds all following numbers together.",
    //             "`*`: Multiplies all following numbers together.",
    //             "`sqrt`: Returns the square root of the following number.",
    //             "`madtanks`: Get the madtanks script (turns diep tanks into madman emojis).",
    //             "`balance`: Check your adasbucks balance.",
    //             "`addmessage`: Adds a message to the global message board, which can be found here: http://50.39.110.171:42069/discordbot/index.html",
    //             "`stackoverflow`: Searches for the following text on stackoverflow.",
    //             "`ship`: Ships two or more users (or really any text phrases).",
    //             "`say`: Says the following text."
    //         ]));
    //     }
    //     if (command[0] == "==eval") {
    //         var cmd2 = "";

    //         for (var i = 1; command.length > i; i++) {
    //             cmd2 += command[i] + " ";
    //         }
    //         if (message.author.id == 192454337958641664) {
    //             eval(cmd2);
    //         } else {
    //             message.channel.send("<@192454337958641664> you do it");
    //         }
    //     }
    //     if (command[0] == "==ship") {
    //         if (command.length >= 3) {
    //         var ship_score = 0;
    //             for (var i2 = 1; command.length > i2; i2++) {
    //                 for (var i = 0; command[i2].length > i; i++) {
    //                     ship_score += command[i2].charCodeAt(i);
    //                 }
    //             }
    //         }
    //         if (hardcoded_100(command)) {
    //             ship_score = 100;
    //         } else {
    //             ship_score %= 100;
    //         }
    //         var shipmsg = "";
    //         for (var i = 1; command.length > i; i++) {
    //             shipmsg += command[i];
    //             if (i != command.length - 1) {
    //                 shipmsg += " x ";
    //             }
    //         }
    //         message.channel.send(shipmsg + ": \nScore: " + ship_score + "%");
    //     }
    // }
    // if (false && /\x3f$/.test(message) && channelID != 358671241059762177) {
    //     request({ url: 'https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&q=' + message + '&site=stackoverflow', gzip: true }, function (error, response, body) {
    //         if (JSON.parse(body).items.length > 0) {
    //             bot.sendMessage({
    //                 to: channelID,
    //                 message: "<@" + message.author.id + "> " + JSON.parse(body).items[0].link
    //             });
    //         } else {
    //             bot.sendMessage({
    //                 to: channelID,
    //                 message: "<@" + message.author.id + "> " + "Found nothing on StackOverflow. Your question sucks ass."
    //             });
    //         }
    //       });
    // }
});