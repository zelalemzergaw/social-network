const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    text: {
        type: String
    },
    link: {
        type: String
    },
    images: [],
    postedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    datePublished: {
        type: Date, 
        default: Date.now()
    },
    targetedUser: {
         age: {
             type: Number
         },
         location: {
             type: String
         }
    }  
}, {timestamps: true});
module.exports = mongoose.model("Advertisement", adSchema);

// {timestamps: true} ===> createdAt and updateAt