var express = require('express');
var socket = require('socket.io');
var PORT = process.env.PORT || 5000;

// set up de las apps

var app = express();
var server = app.listen(PORT, function(){
    console.log(`Listening to requests on port ${PORT}`);
});

// archivos estaticos

app.use(express.static('public'));

// configuración del socket

var io = socket(server);

io.on('connection', function(socket){
    console.log('made socket connection', socket.id);

    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});

