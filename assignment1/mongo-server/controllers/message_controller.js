import mongoose from 'mongoose';
import message_model from '../models/message_model';
var jf = require('jsonfile');
var message_file = '../messages.json';


exports.getMessages = function(req,res){
  //ensure user can access the room
  console.log("Got", req.body)
  message_model.find({ channel_id: req.body.channel_id}, function (err, messages) {
  if(err){
    return res.json({'success':false,'message':err});
    }
    return res.json({'success':true,'message':messages});
  });
};

exports.newMessage = function(req, res){
  var d = req.body
  var message = new message_model({
    channel_id : d.channel_id,
    message : d.message,
    username : d.username
  })
  message.isNew = true;
  message.save((err, message) => {
    if(err){
      return res.json({'success':false, 'message':err})
    }
    write_to_file(message_file, req.body)
    return res.json({'success':true, 'message':message})
  })
  // res.send('message...', message)
};


function write_to_file(file, obj){
  jf.writeFile(file, obj, {flag: 'a', spaces : 2}, function(err) {
    console.log(err);
  })
}