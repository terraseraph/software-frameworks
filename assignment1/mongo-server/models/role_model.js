import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var ChatRoom = new Schema({
  createdAt:{
    type: Date,
    default: Date.now
  },
  room_name: String,
  group_admins: Array,
  group_users: Array
});


export default mongoose.model('groups', ChatRoom);