const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    pseudo: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('users', userSchema);