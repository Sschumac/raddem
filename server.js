var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyparser = require('body-parser')
var roomUtil = require('./helpers/roomUtil.js')
var io = require('socket.io').listen(server)
var p2p = require('socket.io-p2p-server').Server;
var shortid = require('shortid')
io.use(p2p);

app.use(bodyparser.json());

app.get('/',roomUtil.createRoom);

app.get('/:roomid',function(req,res){
  res.type('text/html')
  res.sendFile(__dirname+'/public/index.html')
});

io.on('connection',function(socket){
  console.log(socket.id);
})

app.use(express.static(__dirname + '/public'));

server.listen(8080)
