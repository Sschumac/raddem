var keyMap = {};
var keyMapArray;
var appState = {
  connected:0,
  name:'anonymous',
  id:'',
  peers:[]
};
var client_id;
var p2psocket;
var socket;
var roomState = {};
var my_color;

window.onload = function() {
  document.onkeypress = handleKeyPress;
  mapKeys();
  fetchPeers();
  generateKeyboard();
};

function fetchPeers() {
  client_id = generateUID();
  socket = io(window.location.pathname);
  p2psocket = new P2P(socket);
  p2psocket.emit('join',{
    name:'anonymous',
    id:client_id
  });

  p2psocket.on('room-state',function(data){
    console.log('new room state');
    console.log(data);
    roomState = data;
    my_color = data.peerList.find(function(x){
      return (x.client.id === client_id);
    }).color;
    updateUI();
  });
  p2psocket.on('key-event',function(data) {
    if (data.id !== p2psocket.socket.id) {
      playAudio(data.code);
      colorKey(String.fromCharCode(data.code),data.color);
    }
  });
}

function changeUsername(){
  input = document.getElementById('user-input').value;
  p2psocket.emit('username-change',{
    id:client_id,
    name:input,
  });
}

function updateUI(){
  document.getElementsByClassName('ul-l')[0].innerHTML = '';
  roomState.peerList.forEach(function(x){
    li = document.createElement('li');
    li.innerHTML = x.client.name;
    li.setAttribute('style','color:'+x.color);
    document.getElementsByClassName('ul-l')[0].appendChild(li);
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
  colorKey(String.fromCharCode(code),my_color);
}

function colorKey(code,color){
  key = document.getElementById(code+'');
  setTimeout(function(key){
   key.setAttribute('style','');
  }.bind(this,key),200);
  key.setAttribute('style','background-color:'+color);
}
function playAudio(code) {
  keyMap[code].audio.pause();
  keyMap[code].audio.currentTime=0;
  keyMap[code].audio.play();
}

function generateKeyboard(){
  for (var i = 0; i < keyMapArray.length; i++){
    div = document.createElement('div');
    div.setAttribute('id',keyMapArray[i].key);
    keyLabel = document.createElement('p');
    keyLabel.innerHTML = keyMapArray[i].key;
    keyLabel.setAttribute('class','key-label');
    keySound = document.createElement('p');
    div.setAttribute('class','key');
    div.appendChild(keyLabel);
    if (['q','w','e','r','t','y','u','i','o','p'].indexOf(keyMapArray[i].key) > -1){
      document.getElementsByClassName('row1')[0].appendChild(div);
    }
    if (['a','s','d','f','g','h','j','k','l'].indexOf(keyMapArray[i].key) > -1){
      document.getElementsByClassName('row2')[0].appendChild(div);
    }
    if (['z','x','c','v','b','n','m'].indexOf(keyMapArray[i].key) > -1){
      document.getElementsByClassName('row3')[0].appendChild(div);
    }
  }

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
      key:'f',
      audio:new Audio('Samples/reso.mp3')
    },
    103:{
      Label:'twist',
      key:'g',
      audio:new Audio('Samples/twist.mp3')
    },
    104:{
      Label:'kick-tape',
      key:'h',
      audio:new Audio('Samples/kick-cultivator.wav')
    },
    106:{
      Label:'kick-big',
      key:'j',
      audio:new Audio('Samples/kick-big.wav')
    },
    107:{
      Label:'kick-808',
      key:'k',
      audio:new Audio('Samples/kick-808.wav')
    },
    108:{
      Label:'kick-dry',
      key:'l',
      audio:new Audio('Samples/kick-dry.wav')
    },
    122:{
      Label:'bright',
      key:'z',
      audio:new Audio('Samples/bright.mp3')
    },
    120:{
      Label:'dawks',
      key:'x',
      audio:new Audio('Samples/dawks.mp3')
    },
    99:{
      Label:'vocoder',
      key:'c',
      audio:new Audio('Samples/vocoder.mp3')
    },
    118:{
      Label:'blip',
      key:'v',
      audio:new Audio('Samples/blip.mp3')
    },
    98:{
      Label:'hihat-electro',
      key:'b',
      audio:new Audio('Samples/hihat-electro.wav')
    },
    110:{
      Label:'clap-fat',
      key:'n',
      audio:new Audio('Samples/clap-fat.wav')
    },
    109:{
      Label:'hihat-ring',
      key:'m',
      audio:new Audio('Samples/hihat-ring.wav')
    }
  };

   keyMapArray = [
    {
      Label:'Crash-tape',
      key:'q',
    },
    {
      Label:'clap-fat',
      key:'w',
    },
    {
      Label:'hihat-808',
      key:'e',
    },
    {
      Label:'Kick-Classic',
      key:'r',
    },
    {
      Label:'hihat-electro',
      key:'t',
    },
    {
      Label:'perc-hollow',
      key:'y',
    },
    {
      Label:'snare-808',
      key:'u',
    },
    {
      Label:'snare-acoustic',
      key:'i',
    },
    {
      Label:'snare-analog',
      key:'o',
    },
    {
      Label:'perc-tambo',
      key:'p',
    },
   {
      Label:'NRG',
      key:'a',
    },
    {
      Label:'thin-tab',
      key:'s',
    },
    {
      Label:'strummer',
      key:'d',
    },
    {
      Label:'reso',
      key:'f',
    },
    {
      Label:'twist',
      key:'g',
    },
    {
      Label:'kick-tape',
      key:'h',
    },
    {
      Label:'kick-big',
      key:'j',
    },
    {
      Label:'kick-808',
      key:'k',
    },
    {
      Label:'kick-dry',
      key:'l',
    },
    {
      Label:'bright',
      key:'z',
    },
    {
      Label:'dawks',
      key:'x',
    },
   {
      Label:'vocoder',
      key:'c',
    },
    {
      Label:'blip',
      key:'v',
    },
   {
      Label:'hihat-electro',
      key:'b',
    },
    {
      Label:'clap-fat',
      key:'n',
    },
    {
      Label:'hihat-ring',
      key:'m',
    }
  ];





}
