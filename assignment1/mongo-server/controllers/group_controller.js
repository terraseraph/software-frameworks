import mongoose from 'mongoose';
import group_model from '../models/group_model';

/** Create group */
exports.add_group = function(req,res){
  addGroup(req, function(data){
    return res.json(data)
  })
}

/** update group */
exports.update_group = function(req,res){
  updateGroup(req, function(data){
    return res.json(data)
  })
}

/** get group */
exports.get_group = function(req,res){
  getGroup(req, function(data){
    return res.json(data)
  })
}

/** get all groups */
exports.get_groups = function(req,res){
  getAllGroups(req, function(data){
    return res.json(data)
  })
}



/** remove a group */
exports.remove_group = function(req,res){
  removeGroup(req, function(data){
    return res.json(data)
  })
}

/////////////PRIVATE FUNCTIONS///////////////////////////

function addGroup(req, cb){
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
        cb({'success':false,'message': err});
        return
    }
        cb({'success':true,'message':group});
  })
}

function updateGroup(req, cb){
  group_model.findOneAndUpdate({ _id:req.body.id }, req.body, { new:true }, (err,group) => {
    if(err){
    cb({'success':false,'message':'Some Error','error':err});
    return
    }
    console.log(group);
    cb({'success':true,'message':'Updated successfully',group});
  })
}

function getAllGroups(req, cb){
  group_model.find().exec((err,groups) => {
    if(err){
      cb({'success':false,'message':err});
      return
    }
  cb({'success':true,'message':groups});
  });
}

function getGroup(req, cb){
  group_model.find({_id:req.params.id}).exec((err,group) => {
    if(err){
    cb({'success':false,'message':err});
    return
    }
    if(group.length){
      cb({'success':true,'message':'group fetched by id successfully',group});
      return
    }
    else{
      cb({'success':false,'message':'group with the given id not found'});
    }
  })
}

function removeGroup(req, cb){
  group_model.findByIdAndRemove(req.params.id, (err,group) => {
    if(err){
    cb({'success':false,'message':err});
    return
    }
cb({'success':true,'message':  group});
  })
}