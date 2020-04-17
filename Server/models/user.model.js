const mongoose = require('mongoose'),
      path = require('path'),
      { notiTypes } = require(path.join(__dirname, "..", "util"));
      

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
    },
    resetToken: {
        type: String
    },
    notifications: [{
        notiType: {
            type: Number,
            enum: Object.values(notiTypes),
        },
        post: {
            type: mongoose.Types.ObjectId,
            ref: "Post"
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        message: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
   }]


});

module.exports = mongoose.model('User', userSchema);