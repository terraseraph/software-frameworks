import mongoose from 'mongoose';
import user_model from '../models/user_model';
var jf = require('jsonfile');
var user_file = '../users.json';


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
        role: req.body.role,
        image: "",
        details : {
          fullname : "",
          email: req.body.email,
          dob : ""
        }
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
  user_model.findByIdAndRemove(req.body.id, (err,user) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }
return res.json({'success':true,'message':user});
  })
}

exports.loginUser = function(req, res){
    console.log(req.body)
    // needs all of this, throws a weird query error if it cant find one.......
      user_model.findOne({ username: req.body.username }, function(err, user) {
          if (err) {
            return res.json({'success':false, "message": err})
          }
          if(user != null)
          {
            if(!user.username)
            {
                 return res.json({'success':false, "message": "No user of that name"})
            }
            else
            {
              // test a matching password
              user.comparePassword(req.body.password, function(err, isMatch) {
                  if(err){
                      return res.json({'success':false,'message':'Some Error'});
                  }
                  else{
                    req.body.role = user.role
                    write_to_file(user_file, req.body)
                    return res.json({'success':true,'PasswordMatch': isMatch, "user":user});
                  }
              })            
            }
          }
          else{
             return res.json({'success':false, "message": "No user of that name"})
          }
        });
};

function write_to_file(file, obj){
  jf.writeFile(file, obj, {spaces : 2}, function(err) {
    console.log(err);
  })
}