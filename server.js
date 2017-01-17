var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyparser = require('body-parser');
var io = require('socket.io').listen(server);
var shortid = require('shortid');
var p2p = require('socket.io-p2p-server').Server;

io.use(p2p);

var rooms = {};

app.use(bodyparser.json());

app.get('/',function(req,res){
  var id = shortid.generate();
  rooms[id] = {
    state:{
      peerList:[],
    },
    io:{}
  };
  rooms[id].io = io.of('/'+id);
  rooms[id].io.on('connection',function(client){

    client.on('join',function(data){
      rooms[id].state.peerList.push({
        client:data,
        serverID:client.id
      });
      rooms[id].io.emit('room-state',rooms[id].state);
    });

    client.on('key-event',function(data){
      rooms[id].io.emit('key-event', data);
    });

    client.on('disconnect',function(){
      rooms[id].state.peerList.forEach(function(c,i,a){
        if (client.id === a[i].serverID){
          a.splice(i,1);
        }
      });
      rooms[id].io.emit('room-state',rooms[id].state);
    });


  });
  res.redirect(id);
});

  app.get('/:roomid',function(req,res){
    res.type('text/html');
    res.sendFile(__dirname+'/public/index.html');
  });

  app.use(express.static(__dirname + '/public'));

  server.listen(process.env.PORT || 8080);
