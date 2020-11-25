// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data

const express = require('express');
const fs = require('fs');
var server = express();
var jsonData = {count: 12, message: 'hey'};

server.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html', (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

server.get('/data', (req, res) => {
    res.json(jsonData);
});


server.listen(3000, () => {
    console.log('Listening on Port 3000')
});
