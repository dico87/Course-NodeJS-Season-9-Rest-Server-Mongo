const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;
let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Field name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Field email is required']
    },
    password: {
        type: String,
        required: [true, 'Field password is required']
    },
    photo: {
        type: String        
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: {
            values: ['ADMIN_ROLE', 'USER_ROLE'],
            message: '{VALUE} is not a valid role value'
        }
    },
    active: {
        type: Boolean,
        required: [true, 'Field active is required'],
        default: true
    },
    google: {
        type: Boolean,
        default: false        
    }
});

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

userSchema.plugin(uniqueValidator, {
    message: '{PATH} should be unique'
});

module.exports = mongoose.model('users', userSchema);