const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

let LInfo = new Schema({
    user: { type: String, unique: true, required: true },
    pass: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    dates: {type: Array, required: false},
    createdDate: { type: Date, default: Date.now }
},{
    collection: 'users1'
}
);

module.exports = mongoose.model('User', LInfo);