import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var Groups = new Schema({
  createdAt:{
    type: Date,
    default: Date.now
  },
  group_name: String,
  group_admins: Array,
  group_users: Array
});


export default mongoose.model('groups', Groups);