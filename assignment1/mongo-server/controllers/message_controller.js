import mongoose from 'mongoose';
import message_model from '../models/message_model';
var jf = require('jsonfile');
var message_file = '../messages.json';

/** Get all messages */
exports.getMessages = function(req,res){
  get_messages(req, function(data){
    return res.json(data)
  })
};


/** create a new message */
exports.newMessage = function(req, res){
  new_message(req, function(data){
    return res.json(data)
  })
};

/** Save message (local server function) */
exports.save_message = function(d, cb){
    var message = new message_model({
    channel_id : d.channel_id,
    message : d.message,
    username : d.username,
    user_id : d.user_id,
    image : d.image
  })
  message.isNew = true;
  message.save((err, message) => {
    if(err){
      cb({'success':false, 'message':err})
    }
    else{
      cb({'success':true, 'message':message})
    }
  })
}

///////////////////PRIVATE FUNCTIONS///////////////////////////////////

function get_messages(req, cb){
  console.log("Got", req.body)
  message_model.find({ channel_id: req.body.channel_id}, function (err, messages) {
  if(err){
    cb({'success':false,'message':err});
    return
    }
    cb({'success':true,'message':messages});
  });
}

function new_message(req, cb){
  var d = req.body
  var message = new message_model({
    channel_id : d.channel_id,
    message : d.message,
    username : d.username,
    user_id : d.user_id,
    image : d.image
  })
  message.isNew = true;
  message.save((err, message) => {
    if(err){
      cb({'success':false, 'message':err})
      return
    }
    write_to_file(message_file, req.body)
    cb({'success':true, 'message':message})
  })
}

/** Write to json file (legacy) */
function write_to_file(file, obj){
  jf.writeFile(file, obj, {flag: 'a', spaces : 2}, function(err) {
    console.log(err);
  })
}
