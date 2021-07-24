var express = require('express');
var bodyParser = require('body-parser');
var http       = require("http");
var app = express();

app.use(express.static(__dirname)); // myApp will be the same folder name.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/*', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use('/', function (req, res) {
    res.redirect('/');
});

app.listen(8080, function() {
    console.log('App listening on port 8080');
});