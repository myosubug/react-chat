const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const {addUser, removeUser, getUser, getUsersInRoom} = require('./users.js');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const router = require('./router');
const { disconnect } = require('process');
const PORT = process.env.PORT || 8080;


io.on('connection', (socket) => {
    socket.on('join', ({name, room}, callback) => {
        const {error, user} = addUser({id: socket.id, name, room});
        if (error) return callback(error);

        
        socket.emit('message', {user: 'admin', text: `${user.name} welcome to the chat!`});
        socket.broadcast.to(user.room).emit('message', {user:'admin', text:`${user.name} just have joined the chat!`})

        socket.join(user.room);

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', {user: user.name, text: message});

        callback();
    });

    socket.on('disconnect', () => {
        console.log("user left :(");
    });
});

app.use(router);

server.listen(PORT, () => console.log(`server has started on ${PORT}`));