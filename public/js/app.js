var keyMap = {};

var socket;
window.onload = function() {
  console.log('starting main thread');
  console.log('setting up keypress events');
  document.onkeypress = handleKeyPress;
  console.log('mapping keys');
  mapKeys();
  fetchPeers();
};
function fetchPeers() {
  socket = io(window.location.pathname);
  console.log(socket);
  socket.on('key-event',function(response) {
    console.log("response data ",response.data);
    if (response.data.id !== socket.id) {
      console.log("recieved code: ",response.data.code);
      playAudio(response.data.code);
    }
  });
  
}
function handleKeyPress(e) {
  e = e || window.event;
  var code=e.keyCode;
  socket.emit('key-event',{code:code,id:socket.id});
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
    106:{
      label:'Kick',
      key:'j',
      audio:new Audio('Samples/kick-big.wav')
    },
    102:{
      label:'High Hat',
      key:'f',
      audio:new Audio('Samples/hihat-electro.wav')
    },
    107:{
      label:'Clap',
      key:'k',
      audio:new Audio('Samples/clap-808.wav')
    },
    100:{
      label:'Snare',
      key:'d',
      audio:new Audio('Samples/snare-808.wav')
    },
    115:{
      label:'Perc',
      key:'s',
      audio:new Audio('Samples/perc-808.wav')
    },
    104:{
      label:'Kick Low',
      key:'h',
      audio:new Audio('Samples/kick-stomp.wav')
    },
  };
}
