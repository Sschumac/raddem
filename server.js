var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyparser = require('body-parser')
var roomUtil = require('./helpers/roomUtil.js')
var io = require('socket.io').listen(server)
var shortid = require('shortid')

let rooms = {};

app.use(bodyparser.json());

app.get('/',function(req,res){
  var id = shortid.generate();
  rooms[id] = io.of('/'+id);
  console.log('room created with id: ',id)
  rooms[id].on('connection',function(socket){
    console.log(socket.id)
    socket.on('key-event',function(data){
      rooms[id].emit('key-event',{
        data
      });
    });
  });
  res.redirect(id);
});

app.get('/:roomid',function(req,res){
  res.type('text/html')
  res.sendFile(__dirname+'/public/index.html')
});

app.use(express.static(__dirname + '/public'));

server.listen(process.env.PORT || 8080)
