const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const router = require('./router');
const { disconnect } = require('process');
const PORT = process.env.PORT || 8080;


io.on('connection', (socket) => {
    console.log('new user!!!!! connecteced!!!');

    socket.on('join', ({name, room}, callback) => {
        console.log(name, room);
    });
    socket.on('disconnect', () => {
        console.log("user left :(");
    });
});

app.use(router);

server.listen(PORT, () => console.log(`server has started on ${PORT}`));