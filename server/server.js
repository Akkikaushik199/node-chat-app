//C:\Users\Akshit Ruchika\Desktop\node-todo-api
// C:\Program Files\MongoDB\Server\4.0\bin
// mongod.exe --dbpath C:\data\db

const express = require('express');
const path= require('path');
const http= require('http');
const socketIO= require('socket.io');
const publicPath= path.join(__dirname,'/../public');
const port= process.env.PORT || 3000; //used to connect with the heroku

var app = express();
var server= http.createServer(app);
var io= socketIO(server);

app.use(express.static(publicPath)); //middleware

io.on('connection',(socket)=>{            //Listen for some specific event and do the required
  console.log('New user connected');

  socket.on('disconnect',()=>{
    console.log("User was disconnected");
  });
});

server.listen(port, () => {
  console.log(`Started is up port ${port}`);
});
