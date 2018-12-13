var http = require('http');
var express = require('express');

var app = express();

app.get(/[\s\S]*/, function (req, res) {
    res.sendFile(__dirname + req.url);
    console.log("sent file: " + req.url);
});

app.listen(42069, function () {
	console.log('App successfully started.');
})