const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: { type: String, required: true},
    password: { type: String, required: true},
    isRequest: { type: Boolean, default: 'false' },
    request: {
        sender: { type: String, default: null},
        subject: { type: String, default: null},
        isAccepted: { type: Boolean, default: 'false'}
    }
});

module.exports = mongoose.model('User', userSchema);