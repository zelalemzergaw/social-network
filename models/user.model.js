const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
   },
    username: {
        type: String,
        require: true,
        unique: true,
    },
    photo: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'USER'
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    birthdate: {
        type: Date,
    },
    location: {
        type: String
    },
    posts: [
        { 
            userID: {
                type: mongoose.Types.ObjectId,
                ref: 'Post'
            }
        }
    ],
    advetisements: [
        {
            adId: {
                type: mongoose.Types.ObjectId,
                ref: 'Advertisement'
            }
        }
    ],
    followers: [
        {
            followerID : {
                type: mongoose.Types.ObjectId,
                ref: 'User'
           }
    }],
    following: [{
        followerID : {
            type: mongoose.Types.ObjectId,
            ref: 'User'
       }
    }],
    badPostCount: {
         type: Number,
         default: 0
    },
    createdAt: { 
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "activated" // active, deactivated, deleted
    }


});

module.exports = mongoose.model('User', userSchema);