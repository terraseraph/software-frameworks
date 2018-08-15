import mongoose from 'mongoose';

//import models
import message_model from '../models/message_model';


exports.getMessages = function(req,res){
  //ensure user can access the room
  console.log("Got", req.body)
  message_model.find({ room_id: req.body.room_id}, function (err, messages) {
  if(err){
    return res.json({'success':false,'message':err});
    }
    return res.json({'success':true,'message':messages});
  });
};

exports.newMessage = function(req, res){
  var d = req.body
  var message = new message_model({
    room_id : d.room_id,
    message : d.message,
    username : d.username
  })
  message.isNew = true;
  message.save((err, message) => {
    if(err){
      return res.json({'success':false, 'message':err})
    }
    return res.json({'success':true, 'message':message})
  })
  // res.send('message...', message)
};