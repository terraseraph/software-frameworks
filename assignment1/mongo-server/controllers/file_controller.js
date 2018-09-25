import * as user_model from '../models/user_model';
var fs      = require('fs');
var request = require('request');
var formidable = require('formidable');
var util = require('util');
var mv = require('mv');
var os = require('os');


os.tmpDir = os.tmpdir;
// Or with cookies
// var request = require('request').defaults({jar: true});







exports.save_image = function(req, res){
    console.log("save image ================")
    // console.log(save_fs(req))
    var img_name = req.body.image
    var user_id = req.body.user_id
    var img_path = `./userImages`
    console.log("FILES===", req.files)
    let imageFile = req.files.image;
 
    var testFolder = '../assignment/src/assets'
    fs.readdir(testFolder, (err, files) => {
      files.forEach(file => {
        console.log(file);
      });
    })
    // Use the mv() method to place the file somewhere on your server
    imageFile.mv('./userImages/'+imageFile.name, function(err) {
    // imageFile.mv('../assignment/src/assets/'+imageFile.name, function(err) {
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
    
    // var form = new formidable.IncomingForm();
    // form.parse(req, function(err, fields, files) {
    //   res.writeHead(200, {'content-type': 'text/plain'});
    //   res.write('received upload:\n\n');
    //   res.end(util.inspect({fields: fields, files: files}));
    // });
    
    
    // var form = new formidable.IncomingForm({uploadDir: img_path});
    // console.log("FORM!!!",form)
    
    // form.on('error', (err)=>{
    //   res.send(err)
    // })
    
    // form.on('fileBegin', (name,file)=>{
    //   console.log('FILE PATH=======', file.path)
    //   file.path = form.uploadDir + '/' + file.name;
    // })
    
    // form.on('file', function(field, file){
    //   console.log('FORM.ON FILE====')
    //   save_image_to_user(user_id, file.path)
    //   res.send({
    //     data: {
    //       name : file.name,
    //       path : file.path,
    //       size : file.size
    //     }
    //   })
    // })
    
    // form.parse(req)
    
    // form.parse(req, function (err, fields, files) {
    //   var oldpath = files.image.path;
    //   var newpath = img_path + files.image;
    //   oldpath.mv(newpath, function(err){
    //     console.log(err)
    //   })
    
    
      // fs.rename(oldpath, newpath, function (err) {
      //   if (err) throw err;
      //   res.send('File uploaded and moved!');
      //   // res.end();
      // });
      
    // })
    // // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    // var sampleFile = img_name;
    // // Use the mv() method to place the file somewhere on your server
    // sampleFile.mv(`${img_path}`, function(err) {
    //   if (err){
    //     return res.status(500).send(err);
    //   }
    // res.send('File uploaded!');
    // })
}

function save_image_to_user(user_id, img_path){
  user_model.findOneAndUpdate({ _id:user_id}, {image : img_path}, { new:true }, (err,user) => {
      if(err){
      // return res.json({'success':false,'message':'Some Error','error':err});
      }
      console.log(user);
      // return res.json({'success':true,'message':'Updated successfully',user});
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


/**
 *<form method="post" enctype="multipart/form-data" action="/upload">
    <input type="file" name="file">
    <input type="submit" value="Submit">
</form> 
 * 
 * <html>
  <body>
    <form ref='uploadForm' 
      id='uploadForm' 
      action='http://localhost:8000/upload' 
      method='post' 
      encType="multipart/form-data">
        <input type="file" name="sampleFile" />
        <input type='submit' value='Upload!' />
    </form>     
  </body>
</html>
 * 
 */