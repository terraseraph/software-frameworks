import mongoose from 'mongoose';
//import models
import chat_model from '../models/chat_model';
import user_model from '../models/user_model';


exports.getUsers = function(req,res){
  user_model.find().exec((err,todos) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }
return res.json({'success':true,'message':'Todos fetched successfully',todos});
  });
}


exports.addUser = function(req,res){
    //   const new_user = new user_model(req.body);
    // create a user a new user
    var new_user = new user_model({
        username: req.body.username,
        password: req.body.password
    });
    console.log("===addUser===")
    new_user.save((err,user) => {
        if(err){
        return res.json({'success':false,'message':'Some Error'});
    }
    return res.json({'success':true,'message':'Todo added successfully',user});
  })
}


exports.updateUser = function(req,res){
  user_model.findOneAndUpdate({ _id:req.body.id }, req.body, { new:true }, (err,todo) => {
    if(err){
    return res.json({'success':false,'message':'Some Error','error':err});
    }
    console.log(todo);
    return res.json({'success':true,'message':'Updated successfully',todo});
  })
}


exports.getUser = function(req,res){
  user_model.find({_id:req.params.id}).exec((err,todo) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }
    if(todo.length){
      return res.json({'success':true,'message':'Todo fetched by id successfully',todo});
    }
    else{
      return res.json({'success':false,'message':'Todo with the given id not found'});
    }
  })
}


exports.deleteUser = function(req,res){
  user_model.findByIdAndRemove(req.params.id, (err,todo) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }
return res.json({'success':true,'message':todo.todoText+' deleted successfully'});
  })
}

exports.loginUser = function(req, res){
   user_model.findOne({ username: req.body.username }, function(err, user) {
        if (err) throw err;

        // test a matching password
        user.comparePassword('Password', function(err, isMatch) {
            if (err) throw err;
            console.log('Password:', isMatch); // -> Password123: true
        });

        // // test a failing password
        // user.comparePassword('123Password', function(err, isMatch) {
        //     if (err) throw err;
        //     console.log('123Password:', isMatch); // -> 123Password: false
        // });
    });
}