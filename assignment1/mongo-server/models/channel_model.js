import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var Channel = new Schema({
  createdAt:{
    type: Date,
    default: Date.now
  },
  channel_name: { type: String, required: true, index: { unique: true } },
  group_id: String,
  channel_users: Array
});


export default mongoose.model('channels', Channel);