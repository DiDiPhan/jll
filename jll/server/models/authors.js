const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    nationality: { 
        type: string,
        required: true
    },
    books: {
        type: [String],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', authorSchema);