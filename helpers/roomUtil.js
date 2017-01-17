var shortid = require('shortid');
var rooms = {};


module.exports.createRoom = function(req,res){
  console.log('creating room');
  const id = shortid.generate();
  rooms[id]={
    init:true
  }
  res.redirect('/'+id)

}

module.exports.joinRoom = function(req){
  console.log('joining Room');
}

