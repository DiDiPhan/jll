const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true,
        unique: true
    },
    nationality: { 
        type: String,
        default: 'unknown'
    },
    books: {
        type: [String],
        required: true
    }
}, { timestamps: true });

var Authors = mongoose.model('Author', authorSchema);
module.exports = Authors;