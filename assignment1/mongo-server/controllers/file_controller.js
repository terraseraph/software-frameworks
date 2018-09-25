import * as user_model from '../models/user_model';
var fs      = require('fs');
var request = require('request');
var formidable = require('formidable');
var util = require('util');
var mv = require('mv');
var os = require('os');
const fileUpload = require('express-fileupload');
var path = require('path');
os.tmpDir = os.tmpdir;



exports.get_image = function(req, res){
    var img  = req.params.image_name
    console.log('sending image', img)
    res.sendFile(path.resolve(__dirname, `../userImages/${img}`));
}




exports.save_image = function(req, res){
    console.log("save image ================")
    var img_name = req.body.image
    var user_id = req.body.user_id
    var img_path = `./userImages`
    console.log("FILES===", req.files)
    let imageFile = req.files.image;
    imageFile.mv('./userImages/'+imageFile.name, function(err) {
      if (err)
        return res.status(500).send(err);
   
      res.send({
        data: {
          name : imageFile.name,
          path : imageFile.path,
          size : imageFile.size
        }
      })
    });
}



function save_image_to_user(user_id, img_path){
  user_model.findOneAndUpdate({ _id:user_id}, {image : img_path}, { new:true }, (err,user) => {
      if(err){
      return ({'success':false,'message':'Some Error','error':err});
      }
      console.log(user);
      return ({'success':true,'message':'Updated successfully',user});
  })
  
}

function save_fs(req){
      // get the temporary location of the file
    var tmp_path = req.files[0].path;
    // set where the file should actually exists - in this case it is in the "images" directory
    var target_path = './public/images/' + req.files[0].name;
    // move the file from the temporary location to the intended location
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            return ('File uploaded to: ' + target_path + ' - ' + req.files[0].size + ' bytes');
        });
    });
}