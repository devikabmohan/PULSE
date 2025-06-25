const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true, required: true },
    password: {type: String, required: true},
    role:{type:String, enum:['citizen', 'admin'], default:'citizen'}
});

// module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.models.User || mongoose.model('User', userSchema);