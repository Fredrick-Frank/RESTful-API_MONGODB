const mongoose = require('mongoose');

//building the model schema:
const reviewSchema = new mongoose.Schema({
    rating:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Review', reviewSchema);

