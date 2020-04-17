const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    description: {
        type: String
    },
    imageUrl: [],
    postedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    datePublished: {
        type: Date,
        default: Date.now()
    },
    minAge: {
        type: Number
    },
    maxAge: {
        type: Number
    },
    targetLocation: {
        type: String
    }
}, { timestamps: true });
module.exports = mongoose.model("Advertisement", adSchema);

// {timestamps: true} ===> createdAt and updateAt