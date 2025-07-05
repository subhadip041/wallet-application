const mongoose = require('mongoose');
const User = require('./auth.models')

const accountSchema = new mongoose.Schema({
   userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

// module.exports = (connection) => connection.model('account', accountSchema);
const Account = mongoose.model('account', accountSchema);
module.exports = Account

