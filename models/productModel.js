const mongoose = require('mongoose');

//building the model schema:
const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },

    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    published:{
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);

