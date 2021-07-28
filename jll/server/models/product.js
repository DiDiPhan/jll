const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    author: {
        type: string,
        required: true, 
        trim: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    format: { 
        type: string,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    isbn: {
        type: Number,
        required: true
    },
    book_depository_stars: { type: Float, required: true},
    old_price: { type: Number, required: true},

    image: { type: String, required: true },
  
    category: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);