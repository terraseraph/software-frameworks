import mongoose from 'mongoose';
//import models
import user_model from '../models/user_model';


exports.getUsers = function(req,res){
  user_model.find().exec((err,users) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }
return res.json({'success':true,'message':users});
  });
}


exports.addUser = function(req,res){
    var new_user = new user_model({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    });
    new_user.save((err,user) => {
        if(err){
        return res.json({'success':false,'message': err});
    }
    return res.json({'success':true,'message':'User added successfully',user});
  })
}


exports.updateUser = function(req,res){
  user_model.findOneAndUpdate({ _id:req.body.id }, req.body, { new:true }, (err,user) => {
    if(err){
    return res.json({'success':false,'message':'Some Error','error':err});
    }
    console.log(user);
    return res.json({'success':true,'message':'Updated successfully',user});
  })
}


exports.getUser = function(req,res){
  user_model.find({_id:req.params.id}).exec((err,user) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }
    if(user.length){
      return res.json({'success':true,'message':'User fetched by id successfully',user});
    }
    else{
      return res.json({'success':false,'message':'User with the given id not found'});
    }
  })
}


exports.deleteUser = function(req,res){
  user_model.findByIdAndRemove(req.params.id, (err,user) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }
return res.json({'success':true,'message':user.username+' deleted successfully'});
  })
}

exports.loginUser = function(req, res){
   user_model.findOne({ username: req.body.username }, function(err, user) {
        if (err) throw err;

        // test a matching password
        user.comparePassword(req.body.password, function(err, isMatch) {
            if(err){
                return res.json({'success':false,'message':'Some Error'});
            }
            else{
              return res.json({'success':true,'PasswordMatch': isMatch});
            }
        })            
    });
};