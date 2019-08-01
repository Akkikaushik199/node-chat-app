//C:\Users\Akshit Ruchika\Desktop\node-todo-api
// C:\Program Files\MongoDB\Server\4.0\bin
// mongod.exe --dbpath C:\data\db

const express = require('express');
const path= require('path');
const http= require('http');
const socketIO= require('socket.io');

const {generateMessage}= require('./utils/message');
const publicPath= path.join(__dirname,'/../public');
const port= process.env.PORT || 3000; //used to connect with the heroku

var app = express();
var server= http.createServer(app);
var io= socketIO(server);

app.use(express.static(publicPath)); //middleware

io.on('connection',(socket)=>{       //Listen for some specific event and do the required
  console.log('New user connected');

  socket.emit('newMessage',generateMessage('Admin','Welcome to the chat App'));

  socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

  socket.on('createMessage',(newMessage)=>{
    console.log('createMessage',newMessage);
    io.emit('newMessage',generateMessage(newMessage.from,newMessage.text));
    // socket.broadcast.emit('newMessage',{
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect',()=>{
    console.log("User was disconnected");
  });
});

server.listen(port, () => {
  console.log(`Started is up port ${port}`);
});
