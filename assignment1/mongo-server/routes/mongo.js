import express from 'express';
import * as user_controller from '../controllers/user_controller';
import * as group_controller from '../controllers/group_controller';
import * as message_controller from '../controllers/message_controller';
import * as channel_controller from '../controllers/channel_controller';
import * as file_controller from '../controllers/file_controller';
const router = express.Router();
var multer  = require('multer')



// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//           console.log(req, file)
//     cb(null, './userImages')
//   },
//   filename: function (req, file, cb) {
//           console.log(req, file)
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })
 
// var upload = multer({ storage: storage })


router.route('/users')
     .get(user_controller.getUsers)
     .post(user_controller.addUser);

router.route('/users/edit')
        .post(user_controller.updateUser);
     
router.route('/users/:id')
      .get(user_controller.getUser)

router.route('/users/remove')
        .post(user_controller.deleteUser)
      
      
router.route('/users/login')
        .post(user_controller.loginUser);
        
router.route('/users/upload')
        .post(file_controller.save_image)
        
        
//Chat api below

//======Groups======
router.route('/group/add_group')
        .post(group_controller.add_group);
        
router.route('/group/update_group')
        .post(group_controller.update_group)
        
router.route('/group/:id')
        .get(group_controller.get_group)

router.route('/group')
        .get(group_controller.get_groups)
        
router.route('/group/remove_group')
        .post(group_controller.remove_group)

        
        
//===== Messages==========
router.route('/chat/message')
        .post(message_controller.newMessage);
        // .get(message_controller.getMessages)
        
router.route('/chat/room_messages')
        .post(message_controller.getMessages);
        
router.route('/chat/upload')
        .post(file_controller.save_image)
        
        
//===========Channels========

router.route('/channel/add_channel')
        .post(channel_controller.add_channel)
        
router.route('/channel/update_channel')
        .post(channel_controller.update_channel)
        
//put :group_id/:channel_id
router.route('/channel/:id')
        .get(channel_controller.get_channel)       
        
router.route('/channel')
        .get(channel_controller.get_channels)
        
router.route('/channel/remove_channel')
        .post(channel_controller.remove_channel)
        
        
//==========Images==============
router.route('/images/:image_name')
        .get(file_controller.get_image)
        
export default router;