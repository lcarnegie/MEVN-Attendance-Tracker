const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

let CInfo = new Schema({
    user: { type: String, required: true },
    clubname: { type: String, required: true },
    dates: {type: Array, required: false}
},{
    collection: 'cinfo'
}
);

module.exports = mongoose.model('Club', CInfo);