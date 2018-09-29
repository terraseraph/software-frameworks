import mongoose from 'mongoose';
import user_model from '../models/user_model';
var jf = require('jsonfile');
var user_file = '../users.json';

/** get all users */
exports.getUsers = function(req,res){
  getAllUsers(req, function(data){
    return res.json(data)
  })
}

/** add a user */
exports.addUser = function(req,res){
  addUser(req, function(data){
    return res.json(data)
  })
}

/** update a user */
exports.updateUser = function(req,res){
  updateUser(req, function(data){
    return res.json(data)
  })
}

/** get a user */
exports.getUser = function(req,res){
  getUser(req, function(data){
    return res.json(data)
  })
}

/** remove a user */
exports.deleteUser = function(req,res){
  removeUser(req, function(data){
    return res.json(data)
  })
}

/** login user */
exports.loginUser = function(req, res){
  loginUser(req, function(data){
    return res.json(data)
  })
};


//////////////////////////////PRIVATE FUNCTIONS////////////////////////////////////////

/** write to json(legacy) */
function write_to_file(file, obj){
  jf.writeFile(file, obj, {spaces : 2}, function(err) {
    console.log(err);
  })
}


function addUser(req, cb){
    var new_user = new user_model({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        image: "blank.jpg",
        details : {
          fullname : "",
          email: req.body.email,
          dob : ""
        }
    });
    new_user.save((err,user) => {
        if(err){
        cb({'success':false,'message': err});
        return
    }
    cb({'success':true,'message':'User added successfully',user});
  })
}

function updateUser(req, cb){
  user_model.findOneAndUpdate({ _id:req.body.id }, req.body, { new:true }, (err,user) => {
    if(err){
    cb({'success':false,'message':'Some Error','error':err});
    return
    }
    console.log(user);
    cb({'success':true,'message':'Updated successfully',user});
  })
}

function getAllUsers(req, cb){
  user_model.find().exec((err,users) => {
    if(err){
    cb({'success':false,'message':'Some Error'});
    return
    }
cb({'success':true,'message':users});
  });
}

function getUser(req, cb){
  user_model.find({_id:req.params.id}).exec((err,user) => {
    if(err){
    cb({'success':false,'message':'Some Error'});
    return
    }
    if(user.length){
      cb({'success':true,'message':'User fetched by id successfully',user});
      return
    }
    else{
      cb({'success':false,'message':'User with the given id not found'});
      return
    }
  })
}

function removeUser(req, cb){
  user_model.findByIdAndRemove(req.params.id, (err,user) => {
    if(err){
      cb({'success':false,'message':err});
      return
    }
    cb({'success':true,'message':user});
  })
}

function loginUser(req, cb){
    console.log(req.body)
    // needs all of this, throws a weird query error if it cant find one.......
      user_model.findOne({ username: req.body.username }, function(err, user) {
          if (err) {
            cb({'success':false, "message": err})
          }
          if(user != null)
          {
            if(!user.username)
            {
                 cb({'success':false, "message": "No user of that name"})
            }
            else
            {
              // test a matching password
              user.comparePassword(req.body.password, function(err, isMatch) {
                  if(err){
                      cb({'success':false,'message':'Some Error'});
                      return
                  }
                  else{
                    req.body.role = user.role
                    write_to_file(user_file, req.body)
                    cb({'success':true,'PasswordMatch': isMatch, "user":user});
                    return
                  }
              })            
            }
          }
          else{
             cb({'success':false, "message": "No user of that name"})
          }
        });
}