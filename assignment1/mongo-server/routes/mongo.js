import express from 'express';
import * as user_controller from '../controllers/user_controller';
import * as chat_controller from '../controllers/chat_controller';
import * as message_controller from '../controllers/message_controller';
// get an instance of express router
const router = express.Router();


router.route('/users')
     .get(user_controller.getUsers)
     .post(user_controller.addUser)
     .put(user_controller.updateUser);
     
     
router.route('/users/:id')
      .get(user_controller.getUser)
      .delete(user_controller.deleteUser);
      
      
router.route('/users/login')
        .post(user_controller.loginUser);
        
        
//Chat api below

router.route('/chat/room/:id')
        .get(chat_controller.getRoom)
        .delete(chat_controller.deleteRoom)

router.route('/chat/rooms')
        .get(chat_controller.getRooms)

router.route('/chat/addRoom')
        .post(chat_controller.addRoom);
        
router.route('/chat/message')
        .post(message_controller.newMessage);
        // .get(message_controller.getMessages)
        
router.route('/chat/room_messages')
        .post(message_controller.getMessages);
        
        
        
export default router;