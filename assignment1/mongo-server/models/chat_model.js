import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var ChatRoom = new Schema({
  createdAt:{
    type: Date,
    default: Date.now
  },
  room_name: String,
  room_admin: String
});


export default mongoose.model('chat', ChatRoom);