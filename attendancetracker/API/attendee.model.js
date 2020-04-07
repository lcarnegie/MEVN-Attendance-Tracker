const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

let Attendee = new Schema({
    name: { type: String, required: true },
    user: { type: String, required: true },
    active: { type: Boolean, required: false },
    presences: {type: Array, reqired: false},
    absenses: {type: Array, required: false},
    createdDate: { type: Date, default: Date.now }
},{
    collection: 'attendees'
}
);

module.exports = mongoose.model('Attendee', Attendee);