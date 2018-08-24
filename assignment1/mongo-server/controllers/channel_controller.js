import mongoose from 'mongoose';
import channel_model from '../models/channel_model';

exports.add_channel = function(req,res){
    console.log(req.body)
    var channel_users = req.body.channel_users
    var group_id = req.body.group_id
    
    var new_channel = new channel_model({
        channel_name: req.body.channel_name,
        group_id: group_id,
        channel_users: [channel_users]
    });
    
    console.log(new_channel)
    new_channel.save((err,channel) => {
        if(err){
        return res.json({'success':false,'message': err});
    }
    return res.json({'success':true,'message':channel});
  })
}


exports.update_channel = function(req,res){
  channel_model.findOneAndUpdate({ _id:req.body.id }, req.body, { new:true }, (err,channel) => {
    if(err){
    return res.json({'success':false,'message':'Some Error','error':err});
    }
    console.log(channel);
    return res.json({'success':true,'message':'Updated successfully',channel});
  })
}


exports.get_channel = function(req,res){
  channel_model.find({_id:req.params.id}).exec((err,channel) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }
    if(channel.length){
      return res.json({'success':true,'message':'channel fetched by id successfully',channel});
    }
    else{
      return res.json({'success':false,'message':'channel with the given id not found'});
    }
  })
}


exports.get_channels = function(req,res){
  channel_model.find().exec((err,channels) => {
    if(err){
      return res.json({'success':false,'message':'Some Error'});
    }
  return res.json({'success':true,'message':channels});
  });
}




exports.remove_channel = function(req,res){
  channel_model.findByIdAndRemove(req.body.id, (err,channel) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }
return res.json({'success':true,'message':  channel});
  })
}
