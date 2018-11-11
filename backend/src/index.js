const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app); // Extract server http created with express
const io = require('socket.io')(server); // Enable server to listen WS protocol for socket

mongoose.connect('mongodb://USER:PASSWORD@ds155243.mlab.com:55243/DATA', {
    useNewUrlParser: true
});

// Req middleware, just adding a new io variable
app.use((req, res, next) => { // Add a global io variable to all other req
    req.io = io;

    return next(); // continue with other req
});

app.use(cors());
app.use(express.json()); // To express handle data using json
app.use(require('./routes'));

server.listen(3000, () => { // using server to enable the WS protocol from socket
    console.log('Server started port 3000');
});