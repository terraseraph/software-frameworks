import express from 'express';
import * as user_controller from '../controllers/user_controller';
import * as group_controller from '../controllers/group_controller';
import * as message_controller from '../controllers/message_controller';
import * as channel_controller from '../controllers/channel_controller';
import * as file_controller from '../controllers/file_controller';
const router = express.Router();
var multer  = require('multer')


//=========Users=============
router.route('/users')
        .get(user_controller.getUsers)          //get all users
        .post(user_controller.addUser)          //create new user
        .put(user_controller.updateUser)        //update a user


router.route('/users/:id')
      .get(user_controller.getUser)             //get a user
      .delete(user_controller.deleteUser)       //delete a user
      
    
router.route('/users/login')
        .post(user_controller.loginUser);       //login a user
       
       
router.route('/users/upload')
        .post(file_controller.save_image)       //upload an image for a user
        
        
//Chat api below

//======Groups======
router.route('/group')
        .get(group_controller.get_groups)       //get all groups
        .post(group_controller.add_group)       //create a new group
        .put(group_controller.update_group)     //update a group

        
router.route('/group/:id')
        .get(group_controller.get_group)        //get a group
        .delete(group_controller.remove_group)  //delete a group

        
        
//===== Messages==========
router.route('/chat/message')
        .post(message_controller.newMessage);   // create a new message
        
router.route('/chat/room_messages')
        .post(message_controller.getMessages);  //get all messages of a room
        
router.route('/chat/upload')
        .post(file_controller.save_image)       //image upload
        
        
//===========Channels========

router.route('/channel')
        .get(channel_controller.get_channels)   //get all
        .post(channel_controller.add_channel)   //create new
        .put(channel_controller.update_channel) //update
        
//put :group_id/:channel_id
router.route('/channel/:id')
        .get(channel_controller.get_channel)       //get one
        .delete(channel_controller.remove_channel) //delete
        
        
//==========Images==============
router.route('/images/:image_name')
        .get(file_controller.get_image)
        
export default router;