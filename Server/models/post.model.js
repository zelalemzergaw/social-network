const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "Post"
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    images: [],
    postedBy: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    comments: [{
        text: {
            type: String
        },
        commentedBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        createdAt : { type : Date, default: Date.now }
        
    }],
    likes: [{
        likedBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }

    }],
    stuatus: {
        type: String,
        default: "ok"
    },

}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
// {timestamps: true} ===> createdAt and updateAt