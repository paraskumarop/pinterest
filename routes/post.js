const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/Pin');


const postSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title:{
        type: String,
    },
    description:{
        type: String,
    },
    image:{
        type: String,
    },
})

module.exports = mongoose.model('Post',postSchema);