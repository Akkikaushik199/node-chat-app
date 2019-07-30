var socket=io();
socket.on('connect',function(){
  console.log('Connected to the server');

  socket.emit('createMessage',{
    from:'jen@example.com',
    text:' Hey! How are you'
  })
});

socket.on('disconnect',function(){
  console.log("Disconnected from server");
});

socket.on('newMessage',function(message){
  console.log('New message received',message);
});
