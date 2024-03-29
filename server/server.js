//C:\Users\Akshit Ruchika\Desktop\node-todo-api
// C:\Program Files\MongoDB\Server\4.0\bin
// mongod.exe --dbpath C:\data\db

const express = require('express');
const path= require('path');
const http= require('http');
const socketIO= require('socket.io');

const {generateMessage,generateLocationMessage}= require('./utils/message');
const {isRealString}= require('./utils/validation');
const {Users}= require('./utils/users');

const publicPath= path.join(__dirname,'/../public');
const port= process.env.PORT || 3000; //used to connect with the heroku

var app = express();
var server= http.createServer(app);
var io= socketIO(server);
var users= new Users();

app.use(express.static(publicPath)); //middleware

io.on('connection',(socket)=>{       //Listen for some specific event and do the required
  console.log('New user connected');

  socket.on('join',(params,callback)=>{
    if(!isRealString(params.name)|| !isRealString(params.room)){
      callback('Name and room name are required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat App'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined.`));
    callback();
  });

  socket.on('createMessage',(newMessage,callback)=>{
    var user= users.getUser(socket.id);

    if(user && isRealString(newMessage.text)){
      io.to(user.room).emit('newMessage',generateMessage(user.name,newMessage.text));
    }

    callback();
  });

  socket.on('createLocationMessage', (coords)=>{
    var user= users.getUser(socket.id);

    if(user){
      io.to(user.room).emit('newLocationMessage' ,generateLocationMessage(user.name, coords.latitude,coords.longitude));
    }

  });

  socket.on('disconnect',()=>{
    var user= users.removeUser(socket.id);

    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));
    }
  });
});

server.listen(port, () => {
  console.log(`Started is up port ${port}`);
});
