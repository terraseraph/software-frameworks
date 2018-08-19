import mongoose from 'mongoose';
var Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;


var UserSchema = new Schema({
    createdAt:{
        type: Date,
        default: Date.now
    },
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    email: { type: String},
    role: { type: String, required: true },
    groups: {type: Object},
    details: {type: Schema.Types.Mixed}
});


// UserSchema.pre('save', function(next) {
//     var user = this;

//     // only hash the password if it has been modified (or is new)
//     if (!user.isModified('password')) return next();

//     // generate a salt
//     bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//         if (err) return next(err);

//         // hash the password using our new salt
//         bcrypt.hash(user.password, salt, function(err, hash) {
//             if (err) return next(err);

//             // override the cleartext password with the hashed one
//             user.password = hash;
//             next();
//         });
//     });
// });



UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    //Add this back in, has something to do with not being able to use pre in the findandupdate()
    // bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    //     if (err) return cb(err);
    //     cb(null, isMatch);
    // });
    if(candidatePassword == this.password){
        cb(null, true)
    }
    else{
        return cb(null, false)
    }
};



export default mongoose.model('User', UserSchema);