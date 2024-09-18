const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pdtSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }},
    { timestamps: true});

    const Product =  mongoose.model('Product', pdtSchema);
    module.exports = Product;