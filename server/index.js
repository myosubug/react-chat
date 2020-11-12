const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const {addUser, removeUser, getUser, getUserInRoom, changeUserName} = require('./users.js');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const router = require('./router');
const { disconnect } = require('process');
const PORT = process.env.PORT || 8080;


io.on('connection', (socket) => {
    socket.on('join', ({name, room}, callback) => {
        const {error, user} = addUser({id: socket.id, name, room});
        if (error) { 
            socket.emit('message', {user: 'admin', text: `${error}`, oldName: "admin"});
        }
        
        socket.emit('message', {user: 'admin', text: `${user.name} welcome to the chat!`, oldName: "admin"});
        socket.broadcast.to(user.room).emit('message', {user:'admin', text:`${user.name} just have joined the chat!`, oldName: "admin"});
        io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room) });
        socket.join(user.room);
        callback();
    });

    socket.on('sendMessage', (message, currentUser, callback) => {
        let user = getUser(socket.id);
        console.log(user);
        console.log(currentUser);
        console.log(message);
        let oldName = user.name;
        if (message.includes("/name") && user.name === currentUser){
          let splited = message.split(/(\s+)/).filter( e => e.trim().length > 0);
          let newName = splited[1];
          changeUserName(socket.id, newName);
          changed = true;
        }

        io.to(user.room).emit('message', {user: user.name, text: message, oldName: oldName});
        io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room)});
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        console.log("user left :(");
        if(user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.`, oldName: "admin"});
            io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room)});
          }
    });
});

app.use(router);

server.listen(PORT, () => console.log(`server has started on ${PORT}`));