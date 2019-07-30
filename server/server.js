//C:\Users\Akshit Ruchika\Desktop\node-todo-api
// C:\Program Files\MongoDB\Server\4.0\bin
// mongod.exe --dbpath C:\data\db

const express = require('express');
const path= require('path');
const publicPath= path.join(__dirname,'/../public');
const port= process.env.PORT || 3000; //used to connect with the heroku

var app = express();

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Started is up port ${port}`);
});
