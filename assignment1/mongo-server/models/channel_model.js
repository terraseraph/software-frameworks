import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var Channel = new Schema({
  createdAt:{
    type: Date,
    default: Date.now
  },
  channel_name: String,
  group_id: String,
  channel_users: Array
});


export default mongoose.model('channels', Channel);