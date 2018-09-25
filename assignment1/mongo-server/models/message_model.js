import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var Message = new Schema({
  createdAt:{
    type: Date,
    default: Date.now
  },
  channel_id: { type: String, required: true},
  message: { type: String, required: true},
  username: { type: String, required: true},
  user_id: { type: String, required: true},
  image: { type: String, required: false},
});


export default mongoose.model('messages', Message);