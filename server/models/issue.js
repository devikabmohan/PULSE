const mongoose = require ('mongoose');

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 5000,
        trim: true
    },
    location: {
        type: String,
        required: true,
        maxlength: 500,
        trim: true
    },
    imageURL: {
        type: String,
        default:''
    },
    status: {
        type: String, 
        enum:['open', 'in progress', 'resolved'], 
        default: 'open'
    },
    createdBy: {
        type:mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    createdAt: {
        type:Date, 
        default: Date.now
    }
})

module.exports = mongoose.model('Issue', issueSchema)