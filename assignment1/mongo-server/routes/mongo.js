import express from 'express';
import * as mongo_controller from '../controllers/mongo_controller';
// get an instance of express router
const router = express.Router();


router.route('/users')
     .get(mongo_controller.getUsers)
     .post(mongo_controller.addUser)
     .put(mongo_controller.updateUser);
     
     
router.route('/users/:id')
      .get(mongo_controller.getUser)
      .delete(mongo_controller.deleteUser);
export default router;