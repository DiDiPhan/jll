const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const reviewSchema = new mongoose.Schema({
    rating : {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    review: {
        type: String,
        required: false,
    },
    author: {
        type : String,
        required: true
    }
}, {
    timestamps: true
});

const bookSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        unique: true,
        trim: true 
    },
    author: {
        type: String,
        required: true, 
        trim: true 
    },
    price: { 
        type: Currency, 
        min: 0,
        required: true 
    },
    format: { 
        type: String,
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
    reviews: [reviewSchema],
    old_price: { 
        type: Currency,
        default: 0
    },

    image: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
}, { timestamps: true });

var Books = mongoose.model('Book', bookSchema);
module.exports = Books;