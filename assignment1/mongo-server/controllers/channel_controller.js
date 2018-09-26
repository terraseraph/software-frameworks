import mongoose from 'mongoose';
import channel_model from '../models/channel_model';


exports.add_channel = function(req,res){
  addChannel(req, function(data){
    return res.json(data)
  })
}

/** Update Channel */
exports.update_channel = function(req,res){
  updateChannel(req, function(data){
    return res.json(data)
  })
}

/** Get channel */
exports.get_channel = function(req,res){
  getChannel(req, function(data){
    return res.json(data)
  })
}

/** Get all channels */
exports.get_channels = function(req,res){
  getAllChannels(req, function(data){
    return res.json(data)
  })  
}



/** Remove channel */
exports.remove_channel = function(req,res){
  removeChannel(req, function(data){
    return res.json(data)
  })
}

////////////////////////PRIVATE FUNCTIONS//////////////////////////////////////////

//Add channel
function addChannel(req, cb){
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
        cb ({'success':false,'message': err});
        return
    }
        cb ({'success':true,'message':channel});
        return
  })
}


//UPDATE CHANNEL
function updateChannel(req, cb){
  channel_model.findOneAndUpdate({ _id:req.body.id }, req.body, { new:true }, (err,channel) => {
    if(err){
    cb({'success':false,'message':'Some Error','error':err});
    return
    }
    console.log(channel);
    cb({'success':true,'message':'Updated successfully',channel});
  })
}

//GET A CHANNEL
function getChannel(req, cb){
  channel_model.find({_id:req.params.id}).exec((err,channel) => {
    if(err){
    cb({'success':false,'message':'Some Error'});
    return
    }
    if(channel.length){
      cb({'success':true,'message':'channel fetched by id successfully',channel});
      return
    }
    else{
      cb({'success':false,'message':'channel with the given id not found'});
      return
    }
  })
}


//GEET ALL CHANNELS
function getAllChannels(req, cb){
  channel_model.find().exec((err,channels) => {
    if(err){
      cb({'success':false,'message':'Some Error'});
      return
    }
    cb({'success':true,'message':channels});
  });
}

//REMOVE A CHANNEL
function removeChannel(req, cb){
  channel_model.findByIdAndRemove(req.body.id, (err,channel) => {
    if(err){
    cb({'success':false,'message':'Some Error'});
    }
    cb({'success':true,'message':  channel});
  })
}