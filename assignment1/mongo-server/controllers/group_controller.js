import mongoose from 'mongoose';
import group_model from '../models/group_model';

exports.add_group = function(req,res){
    console.log(req.body)
    var group_admins = req.body.group_admins
    var group_users = req.body.group_users
    var new_group = new group_model({
        group_name: req.body.group_name,
        group_admins: [group_admins],
        group_users: [group_users]
    });
    console.log(new_group)
    new_group.save((err,group) => {
        if(err){
        return res.json({'success':false,'message': err});
    }
    return res.json({'success':true,'message':group});
  })
}


exports.update_group = function(req,res){
  group_model.findOneAndUpdate({ _id:req.body.id }, req.body, { new:true }, (err,group) => {
    if(err){
    return res.json({'success':false,'message':'Some Error','error':err});
    }
    console.log(group);
    return res.json({'success':true,'message':'Updated successfully',group});
  })
}


exports.get_group = function(req,res){
  group_model.find({_id:req.params.id}).exec((err,group) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }
    if(group.length){
      return res.json({'success':true,'message':'group fetched by id successfully',group});
    }
    else{
      return res.json({'success':false,'message':'group with the given id not found'});
    }
  })
}


exports.get_groups = function(req,res){
  group_model.find().exec((err,groups) => {
    if(err){
      return res.json({'success':false,'message':'Some Error'});
    }
  return res.json({'success':true,'message':groups});
  });
}




exports.remove_group = function(req,res){
  group_model.findByIdAndRemove(req.body.id, (err,group) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }
return res.json({'success':true,'message':  group});
  })
}
