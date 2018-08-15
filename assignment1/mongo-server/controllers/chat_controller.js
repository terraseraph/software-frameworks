import mongoose from 'mongoose';
//import models
import chat_model from '../models/chat_model';


// exports.getrooms = function(req,res){
//   room_model.find().exec((err,rooms) => {
//     if(err){
//     return res.json({'success':false,'message':'Some Error'});
//     }
// return res.json({'success':true,'message':'Todos fetched successfully',rooms});
//   });
// }


exports.addRoom = function(req,res){
    var new_room = new chat_model({
        room_name: req.body.room_name,
        room_admin: req.body.username
    });
    new_room.save((err,room) => {
        if(err){
        return res.json({'success':false,'message': err});
    }
    return res.json({'success':true,'message':'room added successfully',room});
  })
}


// exports.updateroom = function(req,res){
//   room_model.findOneAndUpdate({ _id:req.body.id }, req.body, { new:true }, (err,room) => {
//     if(err){
//     return res.json({'success':false,'message':'Some Error','error':err});
//     }
//     console.log(room);
//     return res.json({'success':true,'message':'Updated successfully',room});
//   })
// }


exports.getRoom = function(req,res){
  chat_model.find({_id:req.params.id}).exec((err,room) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }
    if(room.length){
      return res.json({'success':true,'message':'room fetched by id successfully',room});
    }
    else{
      return res.json({'success':false,'message':'room with the given id not found'});
    }
  })
}


exports.getRooms = function(req,res){
  chat_model.find().exec((err,rooms) => {
    if(err){
      return res.json({'success':false,'message':'Some Error'});
    }
  return res.json({'success':true,'message':rooms});
  });
}




exports.deleteRoom = function(req,res){
  chat_model.findByIdAndRemove(req.params.id, (err,room) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }
return res.json({'success':true,'message':room.room_name+' deleted successfully'});
  })
}

// exports.loginroom = function(req, res){
//   room_model.findOne({ roomname: req.body.roomname }, function(err, room) {
//         if (err) throw err;

//         // test a matching password
//         room.comparePassword(req.body.password, function(err, isMatch) {
//             if(err){
//                 return res.json({'success':false,'message':'Some Error'});
//             }
//             else{
//               return res.json({'success':true,'PasswordMatch': isMatch});
//             }
//         })            
//     });
// };