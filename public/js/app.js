var keyMap = {};
var appState = {
  connected:0,
  name:'anonymous',
  id:'',
  peers:[]
};
var p2psocket;
var socket;
var roomState = {};
window.onload = function() {
  document.onkeypress = handleKeyPress;
  mapKeys();
  fetchPeers();
};
function fetchPeers() {
  socket = io(window.location.pathname);
  p2psocket = new P2P(socket);
  console.log(p2psocket);
  p2psocket.emit('join',{
    name:'anonymous',
    id:generateUID()
  });

  p2psocket.on('room-state',function(data){
    roomState = data;
    console.log(roomState);
  });
  p2psocket.on('key-event',function(data) {
    if (data.id !== p2psocket.socket.id) {
      playAudio(data.code);
    }
  });
}

function generateUID(){
  return ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4);
}

function handleKeyPress(e) {
  e = e || window.event;
  var code=e.keyCode;
  socket.emit('key-event',{code:code,id:p2psocket.socket.id});
  playAudio(code);
}

function playAudio(code) {
  console.log('KEY: ',code);
  keyMap[code].audio.pause();
  keyMap[code].audio.currentTime=0;
  keyMap[code].audio.play();
}

function mapKeys() {
  keyMap = {
    113:{
      Label:'Crash-tape',
      key:'q',
      audio:new Audio('Samples/crash-tape.wav')
    },
    119:{
      Label:'clap-fat',
      key:'w',
      audio:new Audio('Samples/clap-fat.wav')
    },
    101:{
      Label:'hihat-808',
      key:'e',
      audio:new Audio('Samples/hihat-808.wav')
    },
    114:{
      Label:'Kick-Classic',
      key:'r',
      audio:new Audio('Samples/kick-classic.wav')
    },
    116:{
      Label:'hihat-electro',
      key:'t',
      audio:new Audio('Samples/hihat-electro.wav')
    },
    121:{
      Label:'perc-hollow',
      key:'y',
      audio:new Audio('Samples/perc-hollow.wav')
    },
    117:{
      Label:'snare-808',
      key:'u',
      audio:new Audio('Samples/snare-808.wav')
    },
    105:{
      Label:'snare-acoustic',
      key:'i',
      audio:new Audio('Samples/snare-acoustic01.wav')
    },
    111:{
      Label:'snare-analog',
      key:'o',
      audio:new Audio('Samples/snare-analog.wav')
    },
    112:{
      Label:'perc-tambo',
      key:'p',
      audio:new Audio('Samples/perc-tambo.wav')
    },
    97:{
      Label:'NRG',
      key:'a',
      audio:new Audio('Samples/nrg.mp3')
    },
    115:{
      Label:'thin-tab',
      key:'s',
      audio:new Audio('Samples/thintab.mp3')
    },
    100:{
      Label:'strummer',
      key:'d',
      audio:new Audio('Samples/superstrummer.mp3')
    },
    102:{
      Label:'reso',
      key:'q',
      audio:new Audio('Samples/reso.mp3')
    },
    103:{
      Label:'twist',
      key:'g',
      audio:new Audio('Samples/twist.mp3')
    },
    104:{
      Label:'kick-tape',
      key:'q',
      audio:new Audio('Samples/crash-tape.wav')
    },
    113:{
      Label:'Crash-tape',
      key:'q',
      audio:new Audio('Samples/crash-tape.wav')
    },
    113:{
      Label:'Crash-tape',
      key:'q',
      audio:new Audio('Samples/crash-tape.wav')
    },
    113:{
      Label:'Crash-tape',
      key:'q',
      audio:new Audio('Samples/crash-tape.wav')
    },
    113:{
      Label:'Crash-tape',
      key:'q',
      audio:new Audio('Samples/crash-tape.wav')
    },
    113:{
      Label:'Crash-tape',
      key:'q',
      audio:new Audio('Samples/crash-tape.wav')
    },
    113:{
      Label:'Crash-tape',
      key:'q',
      audio:new Audio('Samples/crash-tape.wav')
    },
    113:{
      Label:'Crash-tape',
      key:'q',
      audio:new Audio('Samples/crash-tape.wav')
    },
    113:{
      Label:'Crash-tape',
      key:'q',
      audio:new Audio('Samples/crash-tape.wav')
    },
    113:{
      Label:'Crash-tape',
      key:'q',
      audio:new Audio('Samples/crash-tape.wav')
    },
    113:{
      Label:'Crash-tape',
      key:'q',
      audio:new Audio('Samples/crash-tape.wav')
    },
    113:{
      Label:'Crash-tape',
      key:'q',
      audio:new Audio('Samples/crash-tape.wav')
    },
    113:{
      Label:'Crash-tape',
      key:'q',
      audio:new Audio('Samples/crash-tape.wav')
    },
  };
}
